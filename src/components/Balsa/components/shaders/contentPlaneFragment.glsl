varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormal;
uniform sampler2D image;


//

void main() {

    vec4 img = texture2D(image, vUv);
    gl_FragColor = img;

}