uniform sampler2D noise;
uniform float uTime;
varying vec3 vPosition;
varying vec2 vUv;


vec2 mirrorRepeat(vec2 v) {
	vec2 m = mod(v,2.);
	return mix(m,2.0 - m, step(1.0 ,m));
}

void main() {

    // vec2 scaledUv = vec2(vUv.x * 2.0, vUv.y * 2.0 * 1.32 -.25);
        vec2 scaledUv = vec2(vUv.x, vUv.y * 1.32 -.15);

    // vec2 mirroredUv = mirrorRepeat(scaledUv);
    // vec4 textureColor = texture2D(noise, mirroredUv);

    vec4 textureColor = texture2D(noise, vUv);
    textureColor = smoothstep(.25,1., textureColor);

    //Wave

    vec2 squish = vec2(6.);
    float dist = distance(vec2(.5,.5) ,scaledUv );

    float radial = fract(dist - uTime/1.5);

    radial = smoothstep(.2,.0,1.- radial);

    float mask = 1.- step(uTime, dist );
    float mask2 = step(uTime, dist + .7);
    vec3 finalMask = vec3(textureColor * mask * radial * mask2 );

    gl_FragColor = vec4(textureColor.rgb,textureColor.a * radial);
    gl_FragColor = vec4(vec3(radial),1.0);
    gl_FragColor = vec4(vec3(0.035,1.,1.),textureColor.a * finalMask * 4. );
}
