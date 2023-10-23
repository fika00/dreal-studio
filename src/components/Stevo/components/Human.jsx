import React, { useRef } from "react";
import {
  useGLTF,
  useAnimations,
  MeshTransmissionMaterial,
  Gltf,
} from "@react-three/drei";
import { useLoader, useThree, useFrame, act } from "@react-three/fiber";
import {
  TextureLoader,
  PMREMGenerator,
  MeshStandardMaterial,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  FrontSide,
  LoopOnce,
} from "three";
import { useEffect } from "react";

import vertexShader from "./shaders/ScreenColorVertex.glsl";
export function Human(props) {
  const texture = useLoader(TextureLoader, "./models/textures/standard.png");
  const { gl, scene } = useThree();
  const pmrem = new PMREMGenerator(gl);

  const envMap = pmrem.fromEquirectangular(texture).texture;

  const modelRef = useRef();
  const movingMaterial = new MeshStandardMaterial({
    envMap: envMap,
    roughness: 0.35,
    metalness: 0.45,
    envMapIntensity: 1.75,
    wireframe: true,
    wireframeLinewidth: 2, // Adjust the line width as needed
    wireframeLinejoin: "round", // You can also use "miter" or "bevel"

    // side: FrontSide,

    onBeforeCompile: (shader) => {
      shader.uniforms.uTime = { value: 0 };

      // shader.vertexShader = vertexShader;

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
    
                reflectVec = rotate(reflectVec, vec3(1.0, 0.0, 0.0), uTime * 0.1);
                
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

  const group = useRef();
  const { nodes, materials, animations } = useGLTF("models/Stevo_idle.glb");
  const { actions, mixer } = useAnimations(animations, group);

  // useEffect(() => {
  //   const handleAnimationComplete = (e) => {
  //     if (e.action === actions.rigAction) {
  //       console.log("rigAction completed");
  //       actions.rigAction2.reset().play();
  //     } else if (e.action === actions.rigAction2) {
  //       console.log("rigAction2 completed");
  //       actions.rigAction.reset().play();

  //       // Do something else or loop back to the first animation
  //       // actions.rigAction.reset().play();
  //     }
  //   };
  //   actions.rigAction.clampWhenFinished = true;
  //   actions.rigAction2.clampWhenFinished = true;

  //   actions.rigAction.setDuration(10);
  //   actions.rigAction2.setDuration(10);

  //   actions.rigAction.setLoop(LoopOnce, 0);
  //   actions.rigAction2.setLoop(LoopOnce, 0);

  //   mixer.addEventListener("finished", handleAnimationComplete);
  //   console.log(mixer);

  //   actions.rigAction.play();

  //   return () => {
  //     // Cleanup
  //     mixer.removeEventListener("finished", handleAnimationComplete);
  //   };
  // }, []);
  useFrame((state, delta) => {
    // console.log(delta);
    try {
      modelRef.current.material.userData.shader.uniforms.uTime.value +=
        7 * delta;
    } catch (e) {
      console.log(e);
    }
  });

  useEffect(() => {
    console.log(modelRef.current.material);
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="rig">
          <skinnedMesh
            name="BaseSpiderMan"
            geometry={nodes.BaseSpiderMan.geometry}
            material={movingMaterial}
            skeleton={nodes.BaseSpiderMan.skeleton}
            ref={modelRef}
          />
          <primitive object={nodes.root} />
          <primitive object={nodes["MCH-torsoparent"]} />
          <primitive object={nodes["MCH-hand_ikparentL"]} />
          <primitive object={nodes["MCH-upper_arm_ik_targetparentL"]} />
          <primitive object={nodes["MCH-hand_ikparentR"]} />
          <primitive object={nodes["MCH-upper_arm_ik_targetparentR"]} />
          <primitive object={nodes["MCH-foot_ikparentL"]} />
          <primitive object={nodes["MCH-thigh_ik_targetparentL"]} />
          <primitive object={nodes["MCH-foot_ikparentR"]} />
          <primitive object={nodes["MCH-thigh_ik_targetparentR"]} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("models/Stevo_idle.glb");

export default Human;
