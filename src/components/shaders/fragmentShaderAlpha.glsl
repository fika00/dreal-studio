uniform sampler2D texture1;
uniform sampler2D texture2;


varying vec2 vUv;

vec2 mirrorRepeat(vec2 v) {
	vec2 m = mod(v,2.);
	return mix(m,2.0 - m, step(1.0 ,m));
}

void main() {
    vec3 black = vec3(1.0, 1.0, 1.0);
    vec4 textureColor = vec4(black, 1.0);
    
    float alpha = 1.0 - texture2D(texture2, vUv).r;

    float scaleX = 2.75; // Adjust this value as needed
    
    // Modify the texture coordinates to scale along the x-axis
    vec2 scaledUV = vec2((vUv.x * scaleX ) - .5, vUv.y);


    vec2 mirrored = mirrorRepeat(scaledUV);

    float texture1 = 1.0 - texture2D(texture1, mirrored).r;

    gl_FragColor = vec4(textureColor.rgb, textureColor.a * alpha * texture1);
}
