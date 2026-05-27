import { Renderer, Program, Mesh, Triangle } from 'ogl';

const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 0.5, 0.2];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const vertex = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
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

export function initPlasma() {
  if (!window.WebGLRenderingContext) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const container = document.createElement('div');
  container.className = 'plasma-bg';
  document.body.prepend(container);

  const mousePos = { x: 0, y: 0 };
  let currentColor = getThemeColor();

  let renderer;
  try {
    renderer = new Renderer({
      webgl: 2,
      alpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2)
    });
  } catch {
    return;
  }

  const gl = renderer.gl;
  if (!gl) return;

  const canvas = gl.canvas;
  canvas.style.display = 'block';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  container.appendChild(canvas);

  const geometry = new Triangle(gl);

  function buildProgram(colorHex) {
    const rgb = hexToRgb(colorHex);
    return new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uCustomColor: { value: new Float32Array(rgb) },
        uUseCustomColor: { value: 1.0 },
        uSpeed: { value: 0.4 },
        uDirection: { value: 1.0 },
        uScale: { value: 1.1 },
        uOpacity: { value: 0.45 },
        uMouse: { value: new Float32Array([0, 0]) },
        uMouseInteractive: { value: 1.0 }
      }
    });
  }

  let program = buildProgram(currentColor);
  const mesh = new Mesh(gl, { geometry, program });

  const handleMouseMove = e => {
    const rect = container.getBoundingClientRect();
    mousePos.x = e.clientX - rect.left;
    mousePos.y = e.clientY - rect.top;
    const m = program.uniforms.uMouse.value;
    m[0] = mousePos.x;
    m[1] = mousePos.y;
  };
  container.addEventListener('mousemove', handleMouseMove);

  const themeObserver = new MutationObserver(() => {
    const newColor = getThemeColor();
    if (newColor !== currentColor) {
      currentColor = newColor;
      const rgb = hexToRgb(newColor);
      const u = program.uniforms.uCustomColor.value;
      u[0] = rgb[0];
      u[1] = rgb[1];
      u[2] = rgb[2];
    }
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  const setSize = () => {
    const rect = container.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    renderer.setSize(width, height);
    const res = program.uniforms.iResolution.value;
    res[0] = gl.drawingBufferWidth;
    res[1] = gl.drawingBufferHeight;
  };

  const ro = new ResizeObserver(setSize);
  ro.observe(container);
  setSize();

  let raf = 0;
  let contextLost = false;
  let isVisible = true;
  const t0 = performance.now();

  const loop = t => {
    if (contextLost || !isVisible) return;
    program.uniforms.iTime.value = (t - t0) * 0.001;
    renderer.render({ scene: mesh });
    raf = requestAnimationFrame(loop);
  };

  const handleContextLost = e => {
    e.preventDefault();
    contextLost = true;
    cancelAnimationFrame(raf);
  };
  const handleContextRestored = () => {
    contextLost = false;
    if (isVisible) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    }
  };
  canvas.addEventListener('webglcontextlost', handleContextLost);
  canvas.addEventListener('webglcontextrestored', handleContextRestored);

  const io = new IntersectionObserver(([entry]) => {
    const wasVisible = isVisible;
    isVisible = entry.isIntersecting;
    if (isVisible && !wasVisible && !contextLost) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    }
  }, { threshold: 0 });
  io.observe(container);

  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    themeObserver.disconnect();
    canvas.removeEventListener('webglcontextlost', handleContextLost);
    canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    container.removeEventListener('mousemove', handleMouseMove);
    try { container.removeChild(canvas); } catch {}
    try { document.body.removeChild(container); } catch {}
  };
}
