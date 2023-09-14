    uniform float uTime;
    uniform vec3 color;
    varying vec2 vUv;

    void main() {

        // float sine = fract(uTime);

        // vec3 color1 = vec3(1.,0.,0.);
        // vec3 color2 = vec3(0.0);
        // float step = smoothstep(-1.,1.,sin(vUv.x * 20. + uTime));
        float step = smoothstep(.3,.7,sin(vUv.x * 10. + uTime * 3.));

        // vec3 finalColor = mix(step);

      gl_FragColor.rgba = vec4(vec3(step),.3);
    }