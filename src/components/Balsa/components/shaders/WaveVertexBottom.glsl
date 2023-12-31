
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

uniform float uTime;
uniform float xCord;
uniform float yCord;

#define PI 3.14159265358979
#define MOD3 vec3(.1031,.11369,.13787)

vec3 hash33(vec3 p3) {
	p3 = fract(p3 * MOD3);
    p3 += dot(p3, p3.yxz+19.19);
    return -1.0 + 2.0 * fract(vec3((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y, (p3.y+p3.z)*p3.x));
}

// ? Perlin noise
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
    vUv = uv;
    vPosition = position;
    vNormal = normal;

    //WAVE

    float dist = distance(vec2(.5,.5) ,vUv );
    dist = smoothstep(.5,.0,dist);
    float radial = fract(dist - uTime * .06);


    float wave = smoothstep(.1,1.,abs(sin(vUv.y* 6. + uTime/9.)))*2.;

    //
    float xCordScaled = (xCord/100. + 1.) / 2.;
    float yCordScaled = (yCord/100. + 1.) / 2.;


    float hotSpot = distance(vec2(xCordScaled , 1. -yCordScaled),vUv);

    hotSpot = fract(smoothstep(.2,.0, hotSpot ) - uTime / 5.);
    //

    float noiseMult =  1.0 - vPosition.z;
    float noise = pnoise(vPosition / 15. + uTime/19.);
    float perlinDis = noise * (noiseMult);
    float displacement =  wave * .75 + perlinDis * 3.;
    // float displacement =  perlinDis;

    vec3 newPosition = vPosition + vNormal * displacement ; 
    // vec3 newPosition = vPosition + vNormal ; 

    gl_PointSize = 1.8;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}