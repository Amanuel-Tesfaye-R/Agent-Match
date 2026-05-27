const MAX_COLORS = 8;

const vertexSrc = `#version 300 es
precision highp float;
in vec2 a_position;
in vec2 a_uv;
out vec2 vUv;
void main() {
  vUv = a_uv;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentSrc = `#version 300 es
precision highp float;

#define MAX_COLORS ${MAX_COLORS}

uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform float uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
uniform int uIterations;
uniform float uIntensity;
uniform float uBandWidth;

in vec2 vUv;
out vec4 fragColor;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

  for (int j = 0; j < 5; j++) {
    if (j >= uIterations - 1) break;
    vec2 rr = sin(1.5 * (q.yx * uFrequency) + 2.0 * cos(q * uFrequency));
    q += (rr - q) * 0.15;
  }

  vec3 col = vec3(0.0);
  float a = 1.0;

  if (uColorCount > 0) {
    vec2 s = q;
    vec3 sumCol = vec3(0.0);
    float cover = 0.0;
    for (int i = 0; i < MAX_COLORS; ++i) {
      if (i >= uColorCount) break;
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float m = mix(m0, m1, kMix);
      float w = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
      sumCol += uColors[i] * w;
      cover = max(cover, w);
    }
    col = clamp(sumCol, 0.0, 1.0);
    a = uTransparent > 0.5 ? cover : 1.0;
  } else {
    vec2 s = q;
    for (int k = 0; k < 3; ++k) {
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);
      float m = mix(m0, m1, kMix);
      if (k == 0) col.r = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
      if (k == 1) col.g = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
      if (k == 2) col.b = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
    }
    a = uTransparent > 0.5 ? max(max(col.r, col.g), col.b) : 1.0;
  }

  col *= uIntensity;

  if (uNoise > 0.0001) {
    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
    col += (n - 0.5) * uNoise;
    col = clamp(col, 0.0, 1.0);
  }

  vec3 rgb = (uTransparent > 0.5) ? col * a : col;
  fragColor = vec4(rgb, a);
}
`;

function hexToRgb(hex) {
  const h = hex.replace('#', '').trim();
  const v = h.length === 3
    ? [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)]
    : [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  return [v[0] / 255, v[1] / 255, v[2] / 255];
}

function compileShader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn('[colorbends] shader error:', gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

function createProgram(gl, vsSrc, fsSrc) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vsSrc);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSrc);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn('[colorbends] program error:', gl.getProgramInfoLog(prog));
    return null;
  }
  return prog;
}

function getUniform(gl, prog, name) {
  return gl.getUniformLocation(prog, name);
}

export async function initColorBends(config = {}) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'display:block;width:100%;height:100%';
  const container = document.createElement('div');
  container.className = 'colorbends-bg';
  container.appendChild(canvas);
  document.body.prepend(container);

  const gl = canvas.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: false });
  if (!gl) {
    console.log('[colorbends] WebGL2 unavailable');
    return;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.log('[colorbends] reduced motion');
    return;
  }

  const opts = {
    rotation: config.rotation ?? 90,
    speed: config.speed ?? 0.2,
    colors: config.colors ?? ['#ff5c7a', '#8a5cff', '#00ffd1'],
    transparent: config.transparent ?? true,
    autoRotate: config.autoRotate ?? 0,
    scale: config.scale ?? 1,
    frequency: config.frequency ?? 1,
    warpStrength: config.warpStrength ?? 1,
    mouseInfluence: config.mouseInfluence ?? 1,
    parallax: config.parallax ?? 0.5,
    noise: config.noise ?? 0.15,
    iterations: config.iterations ?? 1,
    intensity: config.intensity ?? 1.5,
    bandWidth: config.bandWidth ?? 6,
  };

  // Fullscreen triangle
  const positions = new Float32Array([-1, -1, 3, -1, -1, 3]);
  const uvs = new Float32Array([0, 0, 2, 0, 0, 2]);

  const posBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  const uvBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
  gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);

  const prog = createProgram(gl, vertexSrc, fragmentSrc);
  if (!prog) return;

  const aPos = gl.getAttribLocation(prog, 'a_position');
  const aUv = gl.getAttribLocation(prog, 'a_uv');

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
  gl.enableVertexAttribArray(aUv);
  gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);

  // Uniforms
  const uCanvas = getUniform(gl, prog, 'uCanvas');
  const uTime = getUniform(gl, prog, 'uTime');
  const uSpeed = getUniform(gl, prog, 'uSpeed');
  const uRot = getUniform(gl, prog, 'uRot');
  const uColorCount = getUniform(gl, prog, 'uColorCount');
  const uColors = getUniform(gl, prog, 'uColors');
  const uTransparent = getUniform(gl, prog, 'uTransparent');
  const uScale = getUniform(gl, prog, 'uScale');
  const uFrequency = getUniform(gl, prog, 'uFrequency');
  const uWarpStrength = getUniform(gl, prog, 'uWarpStrength');
  const uPointer = getUniform(gl, prog, 'uPointer');
  const uMouseInfluence = getUniform(gl, prog, 'uMouseInfluence');
  const uParallax = getUniform(gl, prog, 'uParallax');
  const uNoise = getUniform(gl, prog, 'uNoise');
  const uIterations = getUniform(gl, prog, 'uIterations');
  const uIntensity = getUniform(gl, prog, 'uIntensity');
  const uBandWidth = getUniform(gl, prog, 'uBandWidth');

  gl.useProgram(prog);
  gl.uniform1f(uSpeed, opts.speed);
  gl.uniform1f(uScale, opts.scale);
  gl.uniform1f(uFrequency, opts.frequency);
  gl.uniform1f(uWarpStrength, opts.warpStrength);
  gl.uniform1f(uMouseInfluence, opts.mouseInfluence);
  gl.uniform1f(uParallax, opts.parallax);
  gl.uniform1f(uNoise, opts.noise);
  gl.uniform1i(uIterations, opts.iterations);
  gl.uniform1f(uIntensity, opts.intensity);
  gl.uniform1f(uBandWidth, opts.bandWidth);
  gl.uniform1f(uTransparent, opts.transparent ? 1.0 : 0.0);

  // Colors
  const colorVecs = opts.colors.slice(0, MAX_COLORS).map(hexToRgb);
  gl.uniform1i(uColorCount, colorVecs.length);
  for (let i = 0; i < MAX_COLORS; i++) {
    const loc = getUniform(gl, prog, `uColors[${i}]`);
    if (i < colorVecs.length) {
      gl.uniform3fv(loc, colorVecs[i]);
    } else {
      gl.uniform3f(loc, 0, 0, 0);
    }
  }

  // Rotation
  let rotationAngle = opts.rotation;
  const autoRotateSpeed = opts.autoRotate;

  const pointerTarget = { x: 0, y: 0 };
  const pointerCurrent = { x: 0, y: 0 };

  // Mouse tracking via document (same as galaxy)
  const onPointerMove = e => {
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / (rect.width || 1)) * 2 - 1;
    const y = -(((e.clientY - rect.top) / (rect.height || 1)) * 2 - 1);
    pointerTarget.x = x;
    pointerTarget.y = y;
  };
  document.addEventListener('pointermove', onPointerMove);

  // Resize
  const setSize = () => {
    const rect = container.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
    gl.useProgram(prog);
    gl.uniform2f(uCanvas, w, h);
  };
  const ro = new ResizeObserver(setSize);
  ro.observe(container);
  setSize();

  // Render loop
  let running = true;
  let isVisible = true;
  const t0 = performance.now();
  let lastTime = t0;

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  function loop(t) {
    if (!running || !isVisible) return;
    const elapsed = (t - t0) * 0.001;
    const dt = Math.min((t - lastTime) * 0.001, 0.05);
    lastTime = t;

    // Smooth pointer
    const lerpFactor = Math.min(1, dt * 8);
    pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * lerpFactor;
    pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * lerpFactor;

    // Rotation
    const deg = (rotationAngle % 360) + autoRotateSpeed * elapsed;
    const rad = (deg * Math.PI) / 180;
    const c = Math.cos(rad);
    const s = Math.sin(rad);

    gl.useProgram(prog);
    gl.uniform1f(uTime, elapsed);
    gl.uniform2f(uRot, c, s);
    gl.uniform2f(uPointer, pointerCurrent.x, pointerCurrent.y);

    gl.bindVertexArray(vao);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindVertexArray(null);

    requestAnimationFrame(loop);
  }

  // Context loss
  const onLost = e => { e.preventDefault(); running = false; };
  const onRestored = () => { running = true; requestAnimationFrame(loop); };
  canvas.addEventListener('webglcontextlost', onLost);
  canvas.addEventListener('webglcontextrestored', onRestored);

  // Visibility
  const io = new IntersectionObserver(([entry]) => {
    const wasVisible = isVisible;
    isVisible = entry.isIntersecting;
    if (isVisible && !wasVisible) requestAnimationFrame(loop);
  }, { threshold: 0 });
  io.observe(container);

  requestAnimationFrame(loop);

  return () => {
    running = false;
    ro.disconnect();
    io.disconnect();
    canvas.removeEventListener('webglcontextlost', onLost);
    canvas.removeEventListener('webglcontextrestored', onRestored);
    document.removeEventListener('pointermove', onPointerMove);
    try { document.body.removeChild(container); } catch {}
  };
}
