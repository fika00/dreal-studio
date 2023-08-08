varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPattern;

uniform vec2 uResolution;
uniform float uTime;
uniform float uDisplace;
uniform float uSpread;
uniform float uNoise;
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

    float xCordScaled = (xCord/100. + 1.) / 2.;
    float yCordScaled = (yCord/100. + 1.) / 2.;


    float radial = distance(vec2(xCordScaled , 1. -yCordScaled),vUv);

    radial = smoothstep(.2,.0, radial);
    float wave = smoothstep(.6,.0,(abs(sin(vUv.y* 6. + uTime/4.))));
    // gl_FragColor = vec4(vec3(radial + vec3(.4,.5,.3) * radial2),1.0);

    // gl_FragColor = vec4(vec3(radial - radial2) * 2.,1.0);
    float dist = distance(vec2(.5,.5) ,vUv );
    dist = 1. - smoothstep(.5,.0,dist);
    gl_FragColor = vec4(vec3(0.) , 1. - dist);
    
    // gl_FragColor = vec4(vec3(0.) + vec3(.4,.2,.8) * radial, 1. - dist);
    gl_FragColor = vec4(vec3(0.), 1. - dist);
    // gl_FragColor = vec4(radial) ;
}