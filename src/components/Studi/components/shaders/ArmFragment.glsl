
varying vec2 vUv;
uniform sampler2D uTatooMask;
uniform float uTime;
varying vec3 vNormal;
varying vec3 vViewDirection;

  
  
void main() {

    vec4 tattooMask = texture2D(uTatooMask, vUv);

    float rim = 1.0 - dot(normalize(vNormal), normalize(vViewDirection));

    float fresnelPower = ((sin(uTime*2.) + 3.));
    rim = pow(rim, fresnelPower);

    vec4 finalColor = vec4(vec3(rim),1.) ; 

    // rim = 1. - rim;


    gl_FragColor = finalColor;

}