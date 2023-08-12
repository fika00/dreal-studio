varying vec3 vPosition;
varying vec2 vUv;
varying vec2 vAdjustedUV;

varying vec3 vNormal;
varying vec3 vPattern;

uniform sampler2D image;
uniform sampler2D trianglePattern;
uniform float uTimePattern;


//

void main() {

    float dist = distance(vec2(.5, .65), vUv);
    // float radial = smoothstep(.0 + uTimePattern,.1 + uTimePattern, dist);
    float radial = step(1., dist);
    float radial2 = smoothstep(-.3 + (sin(uTimePattern *3.) + 10.) / 16.,0. + (sin(uTimePattern) + 10.) / 16., dist);
    vec2 fractedUv = vec2(vAdjustedUV.x, vAdjustedUV.y - uTimePattern / 5.);
    fractedUv = fract(fractedUv - .1);
    
    vec4 triPattern = texture2D(trianglePattern, vec2(fractedUv.x, fractedUv.y));

    float waveMask = ((1. - radial) * radial2) * (1. -  triPattern.r);


    vec4 textureColor = texture2D(image, vec2(vAdjustedUV.x, vAdjustedUV.y * .8));
    gl_FragColor = vec4((textureColor.rgb  ), textureColor.a *(1. - waveMask * 2.));
    // gl_FragColor = vec4(vec3((1. - radial) * radial2) * (1. -  triPattern.r), 1.);

}