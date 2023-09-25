    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;

    
    void main() {
      vUv = uv;
      vPosition = position;

        float dist = smoothstep(15.,1. ,vPosition.z);


        float displacement = (dist * sqrt((sin(uTime*7.)) + 2.) / 2.);
        vec3 origin = vec3(0,0,5);

      vec3 dir = normalize(position - origin); // direction from origin to position

        vec3 newPos = position + dir * displacement * 2.;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
    }