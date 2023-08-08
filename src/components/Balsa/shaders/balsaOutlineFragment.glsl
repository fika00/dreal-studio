varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPattern;

uniform sampler2D balsaTexture;



void main() {
    vec4 textureColor = texture2D(balsaTexture, vUv);

    float mask = 1.- textureColor.r;

    gl_FragColor = vec4(vec3(mask),1.);
    gl_FragColor = vec4(vec3(0.0), gl_FragColor.a * mask);

}