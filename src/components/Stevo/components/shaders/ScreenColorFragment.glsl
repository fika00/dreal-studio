    uniform sampler2D tDiffuse;
    uniform float time;
    varying vec2 vUv;
    
    void main() {
      vec2 p = vUv;
      vec4 color = texture2D(tDiffuse, p + 0.1 * sin(p.x * 10.0 + time));
      gl_FragColor = color;
    }