varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPattern;

uniform vec2 uResolution;
uniform float uTime;
uniform float uWaveStart;
uniform sampler2D uNoise;

uniform float uDisplace;
uniform float uSpread;
// uniform float uNoise;
uniform float xCord;
uniform float yCord;

#define PI 3.14159265358979
#define MOD3 vec3(.1031,.11369,.13787)

vec3 hash33(vec3 p3) {
	p3 = fract(p3 * MOD3);
    p3 += dot(p3, p3.yxz+19.19);
    return -1.0 + 2.0 * fract(vec3((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y, (p3.y+p3.z)*p3.x));
}
float pnoise(vec3 p) {
    vec3 pi = floor(p);
    vec3 pf = p - pi;
    vec3 w = pf * pf * (3. - 2.0 * pf);
    return 	mix(
        		mix(
                	mix(dot(pf - vec3(0, 0, 0), hash33(pi + vec3(0, 0, 0))),
                        dot(pf - vec3(1, 0, 0), hash33(pi + vec3(1, 0, 0))),
                       	w.x),
                	mix(dot(pf - vec3(0, 0, 1), hash33(pi + vec3(0, 0, 1))),
                        dot(pf - vec3(1, 0, 1), hash33(pi + vec3(1, 0, 1))),
                       	w.x),
                	w.z),
        		mix(
                    mix(dot(pf - vec3(0, 1, 0), hash33(pi + vec3(0, 1, 0))),
                        dot(pf - vec3(1, 1, 0), hash33(pi + vec3(1, 1, 0))),
                       	w.x),
                   	mix(dot(pf - vec3(0, 1, 1), hash33(pi + vec3(0, 1, 1))),
                        dot(pf - vec3(1, 1, 1), hash33(pi + vec3(1, 1, 1))),
                       	w.x),
                	w.z),
    			w.y);
}



void main() {


   // Particle Wave

    float xCordScaled = (xCord/100. + 1.) / 2.;
    float yCordScaled = (yCord/100. + 1.) / 2.;

    float wavePhase = 0.;

    if (uWaveStart > 0.) {
        wavePhase = uWaveStart / 40.;
    } else {
        wavePhase = 0.;
    };

    float radial = distance(vec2(xCordScaled , 1. -yCordScaled),vUv);
    float radial2 = distance(vec2(xCordScaled , 1. -yCordScaled),vUv);
    radial = 1. - smoothstep(wavePhase,wavePhase + .02, radial);
    radial2 = smoothstep(wavePhase - .035,wavePhase, radial2);


    float waveCombined = radial * radial2;

    vec2 fractedUv = fract(vUv * 15.);
    vec4 noise = texture2D(uNoise,fractedUv);
   
    vec3 waveMaskCombined = vec3((1.-noise) * waveCombined);
   //


    float dist = distance(vec2(.5,.5) ,vUv );
    dist = 1. - smoothstep(.5,.0,dist);
    gl_FragColor = vec4(vec3(0.)  + vec3(1.) * (waveMaskCombined / 6.) , 1. - dist);
    
    // gl_FragColor = vec4(vec3(0.) + vec3(.4,.2,.8) * radial, 1. - dist);
    // gl_FragColor = vec4(vec3(0.), 1. - dist);
    // gl_FragColor = vec4(vec3(.2,.1,.5) * radial + vec3(.6,.2,.5) * radial2, 1.) ;

    // gl_FragColor = vec4(radial * radial2);
    // gl_FragColor = vec4(waveMaskCombined, 1.);

}