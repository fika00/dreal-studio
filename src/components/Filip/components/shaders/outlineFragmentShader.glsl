    uniform float uTime;
    uniform vec3 color;   
    uniform vec3 color2;

    varying vec2 vUv;

    void main() {
        float prog = smoothstep(-1.,1.,sin(vUv.x * 10. + uTime * 3.));
        vec3 step = mix(color*.25,color2 * .3,prog);
        float clip = smoothstep(0.01,.1, vUv.x);

        // vec3 finalColor = mix(step);
        

      gl_FragColor.rgba = vec4(step * clip,1.);
    }