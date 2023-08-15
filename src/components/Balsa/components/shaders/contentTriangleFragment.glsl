varying vec3 vPosition;
varying vec2 vUv;
varying vec2 vAdjustedUV;

varying vec3 vNormal;
varying vec3 vPattern;

uniform sampler2D image;
uniform sampler2D trianglePattern;
uniform float uTimePattern;
uniform float uScroll;
uniform float uOpacity;


//

void main() {

    float dist = distance(vec2(.5, .65), vUv);
    // float radial = smoothstep(.0 + uTimePattern,.1 + uTimePattern, dist);
    // float radial = step(1., dist);

    // EdgeMASK

    float radial2 = smoothstep(-.2 + (sin(uTimePattern *10.) + 8.) / 18.,0. + (sin(uTimePattern) + 10.) / 16., dist);
    vec2 fractedUv = vec2(vAdjustedUV.x, vAdjustedUV.y - uTimePattern / 5.);
    fractedUv = fract(fractedUv - .1);
    
    vec4 triPattern = texture2D(trianglePattern, vec2(fractedUv.x, fractedUv.y));

    float edgeWaveMask = radial2 * (1. -  triPattern.r);

    // Inner wave

    float innerRadial = smoothstep(uScroll - .7, uScroll - .0, dist);
    float innerRadial2 = 1. - smoothstep(uScroll -.2, uScroll - .1, dist);



    vec4 textureColor = texture2D(image, vec2(vAdjustedUV.x, vAdjustedUV.y * .8));
    gl_FragColor = vec4((textureColor.rgb * (1. - edgeWaveMask * 3.)) - ((1. - innerRadial) * (triPattern.r * 2.)) , textureColor.a * uOpacity);
    // gl_FragColor = vec4(1. - triPattern.rgb * (innerRadial * innerRadial2), 1.);

}