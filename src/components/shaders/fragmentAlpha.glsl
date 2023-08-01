uniform sampler2D texture1;
uniform sampler2D texture2;
uniform bool invert;


varying vec2 vUv;

vec2 mirrorRepeat(vec2 v) {
	vec2 m = mod(v,2.);
	return mix(m,2.0 - m, step(1.0 ,m));
}

void main() {

    vec4 textureColor = texture2D(texture1, vUv);
    
    float alpha;
    if (invert) {
        alpha = 1.0 - texture2D(texture2, vUv).r;
    } else {
        alpha = texture2D(texture2, vUv).r;
    }



    gl_FragColor = vec4(textureColor.rgb, textureColor.a * alpha );

    // gl_FragColor = vec4(vUv, 1.0, 1.0);

}
