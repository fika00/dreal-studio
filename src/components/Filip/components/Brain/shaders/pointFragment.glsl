    uniform float uTime;
    uniform vec3 color;   
    uniform vec3 color2;

    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
        // float prog = smoothstep(-1.,1.,sin(vUv.x * 10. + uTime * 3.));
        // vec3 step = mix(color*.25,color2 * .3,prog);
        // float clip = smoothstep(0.01,.1, vUv.x);



        
        // float dist = smoothstep(10.,1. ,vPosition.z);


      gl_FragColor = vec4(vec3(1.,1.,0.),1.);
      // gl_FragColor.rgba = vec4(vec3(dist),1.);
    }