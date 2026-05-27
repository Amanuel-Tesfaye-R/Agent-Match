function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 0.5, 0.2];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
}

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
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseInteractive;
out vec4 fragColor;

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;
  
  vec2 mouseOffset = (uMouse - center) * 0.0002;
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);
  
  float i, d, z, T = iTime * uSpeed * uDirection;
  vec3 O, p, S;
  vec2 Q;

  for (vec2 r = iResolution.xy; ++i < 60.; O += o.w/d*o.xyz) {
    p = z*normalize(vec3(C-.5*r,r.y)); 
    p.z -= 4.; 
    S = p;
    d = p.y-T;
    
    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05); 
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T)); 
    z+= d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4; 
    o = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));
  }
  
  o.xyz = tanh(O/1e4);
}

bool finite1(float x){ return !(isnan(x) || isinf(x)); }
vec3 sanitize(vec3 c){
  return vec3(
    finite1(c.r) ? c.r : 0.0,
    finite1(c.g) ? c.g : 0.0,
    finite1(c.b) ? c.b : 0.0
  );
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  vec3 rgb = sanitize(o.rgb);
  
  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;
  vec3 customColor = intensity * uCustomColor;
  vec3 finalColor = mix(rgb, customColor, step(0.5, uUseCustomColor));
  
  float alpha = length(rgb) * uOpacity;
  fragColor = vec4(finalColor, alpha);
}`;

function getThemeColor() {
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  return theme === 'light' ? '#c17f4e' : '#ffff89';
}

function compileShader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn('[plasma] shader error:', gl.getShaderInfoLog(s));
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
    console.warn('[plasma] program error:', gl.getProgramInfoLog(prog));
    return null;
  }
  return prog;
}

function getUniform(gl, prog, name) {
  return gl.getUniformLocation(prog, name);
}

export async function initPlasma() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'display:block;width:100%;height:100%';
  const container = document.createElement('div');
  container.className = 'plasma-bg';
  container.appendChild(canvas);
  document.body.prepend(container);

  const gl = canvas.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: false });
  if (!gl) {
    console.log('[plasma] WebGL2 unavailable');
    return;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.log('[plasma] reduced motion');
    return;
  }

  // Fullscreen triangle (covers clip space with 3 vertices)
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

  // VAO
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
  gl.enableVertexAttribArray(aUv);
  gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);

  const uResolution = getUniform(gl, prog, 'iResolution');
  const uTime = getUniform(gl, prog, 'iTime');
  const uCustomColor = getUniform(gl, prog, 'uCustomColor');
  const uUseCustomColor = getUniform(gl, prog, 'uUseCustomColor');
  const uSpeed = getUniform(gl, prog, 'uSpeed');
  const uDirection = getUniform(gl, prog, 'uDirection');
  const uScale = getUniform(gl, prog, 'uScale');
  const uOpacity = getUniform(gl, prog, 'uOpacity');
  const uMouse = getUniform(gl, prog, 'uMouse');
  const uMouseInteractive = getUniform(gl, prog, 'uMouseInteractive');

  let currentColor = getThemeColor();
  const colorRgb = hexToRgb(currentColor);
  let resolution = [1, 1];
  let mousePos = [0, 0];

  gl.useProgram(prog);
  gl.uniform3fv(uCustomColor, colorRgb);
  gl.uniform1f(uUseCustomColor, 1.0);
  gl.uniform1f(uSpeed, 0.4);
  gl.uniform1f(uDirection, 1.0);
  gl.uniform1f(uScale, 1.1);
  gl.uniform1f(uOpacity, 0.45);
  gl.uniform1f(uMouseInteractive, 1.0);
  gl.uniform2fv(uMouse, mousePos);

  // Theme watcher
  const themeObs = new MutationObserver(() => {
    const c = getThemeColor();
    if (c !== currentColor) {
      currentColor = c;
      gl.useProgram(prog);
      gl.uniform3fv(uCustomColor, hexToRgb(c));
    }
  });
  themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // Mouse
  const onMouse = e => {
    const rect = container.getBoundingClientRect();
    mousePos[0] = e.clientX - rect.left;
    mousePos[1] = e.clientY - rect.top;
    gl.useProgram(prog);
    gl.uniform2fv(uMouse, mousePos);
  };
  container.addEventListener('mousemove', onMouse);

  // Resize
  const setSize = () => {
    const rect = container.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
    gl.useProgram(prog);
    gl.uniform2f(uResolution, w, h);
    resolution = [w, h];
  };
  const ro = new ResizeObserver(setSize);
  ro.observe(container);
  setSize();

  // Render loop
  let running = true;
  let isVisible = true;
  const t0 = performance.now();

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  function loop(t) {
    if (!running || !isVisible) return;
    const elapsed = (t - t0) * 0.001;

    gl.useProgram(prog);
    gl.uniform1f(uTime, elapsed);
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

  // Cleanup
  return () => {
    running = false;
    ro.disconnect();
    io.disconnect();
    themeObs.disconnect();
    canvas.removeEventListener('webglcontextlost', onLost);
    canvas.removeEventListener('webglcontextrestored', onRestored);
    container.removeEventListener('mousemove', onMouse);
    try { document.body.removeChild(container); } catch {}
  };
}
