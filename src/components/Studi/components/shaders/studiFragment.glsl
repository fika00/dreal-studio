uniform sampler2D noise;
uniform float uTime;

uniform sampler2D pic1;
uniform sampler2D pic2;


varying vec3 vPosition;
varying vec2 vUv;


vec2 mirrorRepeat(vec2 v) {
	vec2 m = mod(v,2.);
	return mix(m,2.0 - m, step(1.0 ,m));
}

void main() {

    // vec2 scaledUv = vec2(vUv.x * 2.0, vUv.y * 2.0 * 1.32 -.25);
    // vec2 mirroredUv = mirrorRepeat(scaledUv);
    // vec4 textureColor = texture2D(noise, mirroredUv);

    vec2 scaledUv = vec2(vUv.x, vUv.y * 1.32 -.15);


    vec4 textureColor = texture2D(noise, vUv);
    textureColor = smoothstep(.25,1., textureColor);

    //Wave

    vec2 squish = vec2(6.);
    float dist = distance(vec2(.5,.5) ,scaledUv );

    float radial = fract(dist - uTime/1.5);

    radial = smoothstep(.2,.0,1.- radial);
    
    // Content


    vec2 scaledUvPics = vec2(vUv.x *.9 + .05, vUv.y);


    // vec4 pictureContent1 = texture2D(pic1, scaledUvPics);
    // vec4 pictureContent2 = texture2D(pic2, scaledUvPics);

//
    float mask = 1.- step(uTime, dist);
    float mask2 = step(uTime, dist + .7);
    float test = 1. - (uTime / 1.5, dist);
    float contentMask = 1. - smoothstep(0.0,.3,uTime / 1.5 - dist + .01);

    vec3 viewDir = cameraPosition - vPosition;

    vec3 finalMask = vec3(textureColor * mask * radial * mask2 );


    vec4 pictureContent1 = texture2D(pic1, vec2(scaledUvPics.x * .5 + .3, scaledUvPics.y * .5 + .3) - viewDir.xy * .01);
    vec4 pictureContent2 = texture2D(pic2, scaledUvPics - viewDir.xy * .01);

    // gl_FragColor = vec4(textureColor.rgb,textureColor.a * radial);
    // gl_FragColor = vec4(vec3(radial),1.0);
    // gl_FragColor = vec4(vec3(contentMask),1.0);

    // gl_FragColor = vec4(vec3(0.035,1.,1.),textureColor.a * finalMask * 4. );
    
    gl_FragColor = vec4(pictureContent1.rgb * contentMask + pictureContent2.rgb * (1.0 - contentMask) + vec3(0.035,1.,1.) * finalMask * 4., 1.0);

    // gl_FragColor = vec4(pictureContent1);

}
