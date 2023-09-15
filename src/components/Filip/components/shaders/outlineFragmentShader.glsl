    uniform float uTime;
    uniform vec3 color;
    varying vec2 vUv;

    void main() {

        // float sine = fract(uTime);

        vec3 color1 = vec3(0.0, 1.0, 1.);
        vec3 color2 = vec3(0.0);
        float prog = smoothstep(-1.,1.,sin(vUv.x * 30. + uTime * 3.));
        vec3 step = mix(color1*.25,color2,prog);
        float clip = smoothstep(0.01,.1, vUv.x);

        // vec3 finalColor = mix(step);

      gl_FragColor.rgba = vec4(step * clip,1.);
    }