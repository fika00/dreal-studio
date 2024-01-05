
varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uTime;

  
  
void main() {

    vec4 texture = texture2D(uTexture, vUv);

    // rim = 1. - rim;


    gl_FragColor = texture;

}