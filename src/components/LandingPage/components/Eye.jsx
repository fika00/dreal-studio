import {
  BoxGeometry,
  MeshNormalMaterial,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Scene,
  TextureLoader,
  PMREMGenerator,
  Color,
  Group,
  ShaderMaterial,
  MeshPhysicalMaterial,
} from "three";

import { useRef, useLayoutEffect, useEffect, useState, useMemo } from "react";
import { gsap } from "gsap";
import {
  useGLTF,
  useAnimations,
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { forwardRef, useImperativeHandle } from "react";
import { degToRad, radToDeg } from "three/src/math/MathUtils";

const Eye = (props, ref) => {
  const group = useRef();
  const pupilRef = useRef();
  const camRef = useRef();
  const caminfo = useRef();
  const clipup = useRef();
  const clipdown = useRef();
  const { nodes, materials, animations } = useGLTF("./models/eye_edited.glb");
  const { actions } = useAnimations(animations, group);
  const animationsArePlayingRef = useRef(true);

  nodes.eye.morphTargetInfluences[0] = 0.5;
  const materialRef = useRef();
  const uTime = useRef(0);
  const ready = useRef(false);

  useImperativeHandle(ref, () => ({
    triggerUVEffect,
    stopUVEffect,
    rotate90,
  }));

  const triggerUVEffect = () => {
    gsap.to(uTime, {
      current: 0.1,
      duration: 1, // Duration of the animation in seconds
      ease: "Power1.easeInOut",
    });
  };
  const stopUVEffect = () => {
    const uTimeVal = pupilRef.current.material.userData.shader.uniforms.uTime;

    const scaler =
      Math.ceil(uTimeVal.value / (degToRad(360) * 10)) * degToRad(360) * 10;
    let endPoint = uTimeVal.value + (scaler - uTimeVal.value);
    if (radToDeg((endPoint - uTimeVal.value) / 10) < 80) {
      endPoint += degToRad(360) * 10;
    }

    console.log(
      "Current: ",
      radToDeg(uTimeVal.value) / 10,
      "endPoint: ",
      radToDeg(endPoint / 10),

      "Difference: ",
      radToDeg((endPoint - uTimeVal.value) / 10)
    );

    uTime.current = 0;
    gsap.to(uTimeVal, {
      value: endPoint,
      duration: 2, // Duration of the animation in seconds
      ease: "Power1.easeOut",
    });
  };

  const rotate90 = () => {
    const uTimeVal = pupilRef.current.material.userData.shader.uniforms.uTime;

    console.log("360 to rad: ", (degToRad(360) * 10) / uTimeVal.value);
    console.log(uTimeVal);
    gsap.to(uTimeVal, {
      value: degToRad(360) * 10,
      duration: 1, // Duration of the animation in seconds
      ease: "Power1.easeInOut",
    });
  };
  useFrame(() => {
    try {
      pupilRef.current.material.userData.shader.uniforms.uTime.value +=
        uTime.current;
      // console.log;
    } catch (error) {
      console.log(error);
    }

    // console.log(
    //   radToDeg(
    //     pupilRef.current.material.userData.shader.uniforms.uTime.value
    //   ) / 10
    // );
  });

  let speed = 0.005;

  useEffect(() => {
    const generateRandomEndValues = () => {
      const minRotation = -0.08;
      const maxRotation = 0.08;

      const endRotationX =
        Math.random() * (maxRotation - minRotation) + minRotation;
      const endRotationY =
        Math.random() * (maxRotation - minRotation) + minRotation;

      rotateTo(endRotationX, endRotationY);
    };
    const rotateTo = (endRotationX, endRotationY) => {
      let currentRotationX = pupilRef.current.rotation.x;
      let currentRotationY = pupilRef.current.rotation.y;

      const start_pos = [1.25, -0.02, 2.55];
      const start_rot = [0.015, 0.625, -0.0053];
      const point1_rot = [
        0.4022880492376307, -0.7288169058458661, 0.2761337058605759,
      ];
      const point1_pos = [
        -0.5188029373630827, -0.36398080094788654, 1.430866559943374,
      ];

      const updateRotation = () => {
        currentRotationX += (endRotationX - currentRotationX) * speed;
        currentRotationY += (endRotationY - currentRotationY) * speed;

        nodes.eye.morphTargetInfluences[0] =
          (currentRotationX * (1 - 0.2) + 0.2) * 6;
        pupilRef.current.rotation.x = currentRotationX;
        pupilRef.current.rotation.y = currentRotationY;

        if (
          Math.abs(endRotationX - currentRotationX) < 0.01 &&
          Math.abs(endRotationY - currentRotationY) < 0.01
        ) {
          speed = Math.random() * (0.001 - 0.004) + 0.004;

          generateRandomEndValues();
        } else {
          requestAnimationFrame(updateRotation);
        }
      };

      // if (pupilRef.material.userData) {
      //   console.log(pupilRef.material.userData);
      // }
      updateRotation();
    };

    generateRandomEndValues();
  }, []);

  const { gl, scene } = useThree();
  const pmrem = new PMREMGenerator(gl);
  const texture = useLoader(TextureLoader, "./models/textures/c2.jpg");

  const envMap = pmrem.fromEquirectangular(texture).texture;

  const movingMaterial = new MeshStandardMaterial({
    envMap: envMap,
    roughness: 0.2,
    metalness: 0.65,
    envMapIntensity: 0.75,

    flatShading: false,
    // wireframe: true,
    onBeforeCompile: (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.fragmentShader =
        `
      uniform float uTime;
      mat4 rotationMatrix(vec3 axis, float angle) {
        axis = normalize(axis);
        float s = sin(angle);
        float c = cos(angle);
        float oc = 1.0 - c;
        
        return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                    0.0,                                0.0,                                0.0,                                1.0);
        }
    
    vec3 rotate(vec3 v, vec3 axis, float angle) {
      mat4 m = rotationMatrix(axis, angle);
      return (m * vec4(v, 1.0)).xyz;
    }
      ` + shader.fragmentShader;

      shader.fragmentShader = shader.fragmentShader.replace(
        `#include <envmap_physical_pars_fragment>`,
        `
        #ifdef USE_ENVMAP

	vec3 getIBLIrradiance( const in vec3 normal ) {

		#ifdef ENVMAP_TYPE_CUBE_UV

			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );

			return PI * envMapColor.rgb * envMapIntensity;

		#else

			return vec3( 0.0 );

		#endif

	}

	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {

		#ifdef ENVMAP_TYPE_CUBE_UV

			vec3 reflectVec = reflect( - viewDir, normal );

			// Mixing the reflection with the normal is more accurate and keeps rough objects from gathering light from behind their tangent plane.
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );

			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );

      reflectVec = rotate(reflectVec, vec3(0.0, 1.0, 0.0), uTime * 0.1);
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );

			return envMapColor.rgb * envMapIntensity;

		#else

			return vec3( 0.0 );

		#endif

	}

	#ifdef USE_ANISOTROPY

		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {

			#ifdef ENVMAP_TYPE_CUBE_UV

			  // https://google.github.io/filament/Filament.md.html#lighting/imagebasedlights/anisotropy
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );

				return getIBLRadiance( viewDir, bentNormal, roughness );

			#else

				return vec3( 0.0 );

			#endif

		}

	#endif

#endif
        `
      );

      movingMaterial.userData.shader = shader;
    },
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        {/* <mesh
          ref={clipup}
          scale={0.65}
          name="clipper_upper"
          rotation={[0.785398, 0, 0]}
          // castShadow
          // receiveShadow
          geometry={nodes.clipper_upper.geometry}
        >
          <meshBasicMaterial color={eyelidcol} />
        </mesh>

        <mesh
          ref={clipdown}
          rotation={[-0.785398, 0, 0]}
          scale={0.65}
          name="clipper_lower"
          // castShadow
          // receiveShadow
          geometry={nodes.clipper_lower.geometry}
        >
          <meshBasicMaterial color={eyelidcol} />
        </mesh> */}
        <mesh
          name="eye"
          ref={pupilRef}
          castShadow
          receiveShadow
          // material={movingMaterial}
          geometry={nodes.eye.geometry}
          morphTargetDictionary={nodes.eye.morphTargetDictionary}
          morphTargetInfluences={nodes.eye.morphTargetInfluences}
          flatShading={false}
        >
          <meshStandardMaterial
            color={"white"}
            roughness={0.2}
            metalness={0.8}
            envMapIntensity={10}
          />
        </mesh>
      </group>
      <group position={[-0.3, 0, 0]} ref={camRef}>
        {/* <OrbitControls /> */}
      </group>

      {/* <ambientLight color={"#007d83"} intensity={0.1} /> */}
    </group>
  );
};

export default forwardRef(Eye);
useGLTF.preload("./models/eye_edited.glb");
