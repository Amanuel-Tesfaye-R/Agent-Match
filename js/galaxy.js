const vertexSrc = `#version 300 es
precision highp float;
in vec2 a_position;
in vec2 a_uv;
out vec2 vUv;
void main() {
  vUv = a_uv;
  gl_Position = vec4(a_position, 0, 1);
}
`;

const fragmentSrc = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform float uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;
uniform float uTransparent;

in vec2 vUv;
out vec4 fragColor;

#define NUM_LAYER 4.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float tri(float x) {
  return abs(fract(x) * 2.0 - 1.0);
}

float tris(float x) {
  float t = fract(x);
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
}

float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);

  vec2 gv = fract(uv) - 0.5; 
  vec2 id = floor(uv);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + vec2(float(x), float(y));
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;

      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed;
      vec3 base = vec3(red, grn, blu);
      
      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));

      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;

      float star = Star(gv - offset - pad, flareSize);
      vec3 color = base;

      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;
      
      col += star * size * color;
    }
  }

  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

  vec2 mouseNorm = uMouse - vec2(0.5);
  
  if (uAutoCenterRepulsion > 0.0) {
    vec2 centerUV = vec2(0.0, 0.0);
    float centerDist = length(uv - centerUV);
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
    uv += repulsion * 0.05;
  } else if (uMouseRepulsion > 0.5) {
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
    float mouseDist = length(uv - mousePosUV);
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
    uv += repulsion * 0.05 * uMouseActiveFactor;
  } else {
    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;
    uv += mouseOffset;
  }

  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;

  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

  vec3 col = vec3(0.0);

  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }

  if (uTransparent > 0.5) {
    float alpha = length(col);
    alpha = smoothstep(0.0, 0.3, alpha);
    alpha = min(alpha, 1.0);
    fragColor = vec4(col, alpha);
  } else {
    fragColor = vec4(col, 1.0);
  }
}
`;

function compileShader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn('[galaxy] shader error:', gl.getShaderInfoLog(s));
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
    console.warn('[galaxy] program error:', gl.getProgramInfoLog(prog));
    return null;
  }
  return prog;
}

function getUniform(gl, prog, name) {
  return gl.getUniformLocation(prog, name);
}

export async function initGalaxy(config = {}) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'display:block;width:100%;height:100%';
  const container = document.createElement('div');
  container.className = 'galaxy-bg';
  container.appendChild(canvas);
  document.body.prepend(container);

  const gl = canvas.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: false });
  if (!gl) {
    console.log('[galaxy] WebGL2 unavailable');
    return;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.log('[galaxy] reduced motion');
    return;
  }

  // Defaults
  const opts = {
    focal: config.focal || [0.5, 0.5],
    rotation: config.rotation || [1.0, 0.0],
    starSpeed: config.starSpeed ?? 0.2,
    density: config.density ?? 0.6,
    hueShift: config.hueShift ?? 140,
    speed: config.speed ?? 1.0,
    glowIntensity: config.glowIntensity ?? 0.1,
    saturation: config.saturation ?? 0.0,
    mouseRepulsion: config.mouseRepulsion ?? true,
    twinkleIntensity: config.twinkleIntensity ?? 0.3,
    rotationSpeed: config.rotationSpeed ?? 0.1,
    repulsionStrength: config.repulsionStrength ?? 0.2,
    autoCenterRepulsion: config.autoCenterRepulsion ?? 0,
    transparent: config.transparent ?? true,
    mouseInteraction: config.mouseInteraction ?? true,
  };

  // Fullscreen triangle
  const positions = new Float32Array([-1, -1,  3, -1,  -1, 3]);
  const uvs = new Float32Array([0, 0,  2, 0,  0, 2]);

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
  const uTime = getUniform(gl, prog, 'uTime');
  const uResolution = getUniform(gl, prog, 'uResolution');
  const uFocal = getUniform(gl, prog, 'uFocal');
  const uRotation = getUniform(gl, prog, 'uRotation');
  const uStarSpeed = getUniform(gl, prog, 'uStarSpeed');
  const uDensity = getUniform(gl, prog, 'uDensity');
  const uHueShift = getUniform(gl, prog, 'uHueShift');
  const uSpeed = getUniform(gl, prog, 'uSpeed');
  const uMouse = getUniform(gl, prog, 'uMouse');
  const uGlowIntensity = getUniform(gl, prog, 'uGlowIntensity');
  const uSaturation = getUniform(gl, prog, 'uSaturation');
  const uMouseRepulsion = getUniform(gl, prog, 'uMouseRepulsion');
  const uTwinkleIntensity = getUniform(gl, prog, 'uTwinkleIntensity');
  const uRotationSpeed = getUniform(gl, prog, 'uRotationSpeed');
  const uRepulsionStrength = getUniform(gl, prog, 'uRepulsionStrength');
  const uMouseActiveFactor = getUniform(gl, prog, 'uMouseActiveFactor');
  const uAutoCenterRepulsion = getUniform(gl, prog, 'uAutoCenterRepulsion');
  const uTransparent = getUniform(gl, prog, 'uTransparent');

  gl.useProgram(prog);
  gl.uniform2fv(uFocal, opts.focal);
  gl.uniform2fv(uRotation, opts.rotation);
  gl.uniform1f(uDensity, opts.density);
  gl.uniform1f(uHueShift, opts.hueShift);
  gl.uniform1f(uSpeed, opts.speed);
  gl.uniform1f(uGlowIntensity, opts.glowIntensity);
  gl.uniform1f(uSaturation, opts.saturation);
  gl.uniform1f(uMouseRepulsion, opts.mouseRepulsion ? 1.0 : 0.0);
  gl.uniform1f(uTwinkleIntensity, opts.twinkleIntensity);
  gl.uniform1f(uRotationSpeed, opts.rotationSpeed);
  gl.uniform1f(uRepulsionStrength, opts.repulsionStrength);
  gl.uniform1f(uAutoCenterRepulsion, opts.autoCenterRepulsion);
  gl.uniform1f(uTransparent, opts.transparent ? 1.0 : 0.0);

  // Mouse state with smooth interpolation
  const targetMouse = { x: 0.5, y: 0.5 };
  const smoothMouse = { x: 0.5, y: 0.5 };
  let targetActive = 0.0;
  let smoothActive = 0.0;

  let onMove = null;
  if (opts.mouseInteraction) {
    onMove = e => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
        targetActive = 0.0;
        return;
      }
      targetMouse.x = x / rect.width;
      targetMouse.y = 1.0 - y / rect.height;
      targetActive = 1.0;
    };
    document.addEventListener('mousemove', onMove);
  }

  // Resize
  const setSize = () => {
    const rect = container.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
    gl.useProgram(prog);
    gl.uniform3f(uResolution, w, h, w / h);
  };
  const ro = new ResizeObserver(setSize);
  ro.observe(container);
  setSize();

  // Render loop
  let running = true;
  let isVisible = true;
  const t0 = performance.now();

  if (opts.transparent) {
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);
  } else {
    gl.clearColor(0, 0, 0, 1);
  }

  function loop(t) {
    if (!running || !isVisible) return;
    const elapsed = (t - t0) * 0.001;

    // Smooth mouse interpolation
    const lerpFactor = 0.05;
    smoothMouse.x += (targetMouse.x - smoothMouse.x) * lerpFactor;
    smoothMouse.y += (targetMouse.y - smoothMouse.y) * lerpFactor;
    smoothActive += (targetActive - smoothActive) * lerpFactor;

    gl.useProgram(prog);
    gl.uniform1f(uTime, elapsed);
    gl.uniform1f(uStarSpeed, (elapsed * opts.starSpeed) / 10.0);
    gl.uniform2fv(uMouse, [smoothMouse.x, smoothMouse.y]);
    gl.uniform1f(uMouseActiveFactor, smoothActive);

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
    if (onMove) document.removeEventListener('mousemove', onMove);
    try { document.body.removeChild(container); } catch {}
  };
}
