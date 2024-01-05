
varying vec2 vUv;
uniform sampler2D uTatooMask;
uniform sampler2D uSmoke;
uniform float uTime;
varying vec3 vNormal;
varying vec3 vViewDirection;

  
  
vec2 mirrorRepeat(vec2 v) {
    vec2 m = mod(v,2.);
    return mix(m,2.0 - m, step(1.0 ,m));
}
void main() {

    vec4 tattooMask = texture2D(uTatooMask, vUv);
    vec4 smoke = texture2D(uSmoke, mirrorRepeat(vec2(vUv.x * 2. +uTime * .01,vUv.y * 2. +uTime * .1)));

    float mask = smoke.r;

    float rim = 1.0 - dot(normalize(vNormal), normalize(vViewDirection));

    float fresnelPower = ((sin(uTime) + 3.));
    rim = pow(rim, fresnelPower);

    mask = clamp(mask,.45,1.);

    float finalMask = rim * mask; 

    // rim = 1. - rim;


    gl_FragColor = vec4(3.,3.,3., finalMask);

}