import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import { proxy, useSnapshot } from "valtio";

const damp = THREE.MathUtils.damp;
const material = new THREE.LineBasicMaterial({ color: "white" });
const geometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0, -0.5, 0),
  new THREE.Vector3(0, 0.5, 0),
]);
const state = proxy({
  clicked: null,
  urls: [
    "slika7",
    "slika1",
    "slika2",
    "slika9",
    "slika3",
    "slika4",
    "slika5",
    "slika6",
    "slika8",
    "slika10",
    "slika11",
  ].map((u) => `/imgs/studi/content/${u}.jpg`),
});

// function Minimap() {
//   const ref = useRef();
//   const scroll = useScroll();
//   const { urls } = useSnapshot(state);
//   const { height } = useThree((state) => state.viewport);
//   useFrame((state, delta) => {
//     ref.current.children.forEach((child, index) => {
//       // Give me a value between 0 and 1
//       //   starting at the position of my item
//       //   ranging across 4 / total length
//       //   make it a sine, so the value goes from 0 to 1 to 0.
//       const y = scroll.curve(
//         index / urls.length - 1.5 / urls.length,
//         4 / urls.length
//       );
//       child.scale.y = damp(child.scale.y, 0.1 + y / 6, 8, 8, delta);
//     });
//   });
//   return (
//     <group ref={ref}>
//       {urls.map((_, i) => (
//         <line
//           key={i}
//           geometry={geometry}
//           material={material}
//           position={[i * 0.06 - urls.length * 0.03, -height / 2 + 0.6, 0]}
//         />
//       ))}
//     </group>
//   );
// }

function Item({ index, position, scale, c = new THREE.Color(), ...props }) {
  const ref = useRef();
  const scroll = useScroll();
  const { clicked, urls } = useSnapshot(state);
  const [hovered, hover] = useState(false);
  const click = () => (state.clicked = index === clicked ? null : index);
  const over = () => hover(true);
  const out = () => hover(false);
  useFrame((state, delta) => {
    const y = scroll.curve(
      index / urls.length - 1.5 / urls.length,
      4 / urls.length
    );
    ref.current.material.scale[1] = ref.current.scale.y = damp(
      ref.current.scale.y,
      clicked === index ? 18 : 17 + y * 2,
      8,
      delta
    );
    ref.current.material.scale[0] = ref.current.scale.x = damp(
      ref.current.scale.x,
      clicked === index ? 15 : scale[0],
      6,
      delta
    );
    if (clicked !== null && index < clicked)
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0] - 6,
        6,
        delta
      );
    if (clicked !== null && index > clicked)
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0] + 6,
        6,
        delta
      );
    if (clicked === null || clicked === index)
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0],
        6,
        delta
      );
    ref.current.material.grayscale = damp(
      ref.current.material.grayscale,
      hovered || clicked === index ? 0 : Math.max(0, 1 - y),
      6,
      delta
    );
    ref.current.material.color.lerp(
      c.set(hovered || clicked === index ? "white" : "#aaa"),
      hovered ? 0.3 : 0.1
    );
  });
  return (
    <Image
      ref={ref}
      {...props}
      position={position}
      scale={scale}
      onClick={click}
      onPointerOver={over}
      onPointerOut={out}
    />
  );
}

function Items({ w = 3, gap = 0.7 }) {
  const { urls } = useSnapshot(state);
  const { width } = useThree((state) => state.viewport);
  const xW = w + gap;
  console.log("WIDTH: ", (width - xW + urls.length * xW) / width);

  return (
    <ScrollControls
      horizontal
      damping={0.5}
      pages={(width - xW + urls.length * xW) / width}
      //   pages={4.3}
      style={{
        opacity: 0,
      }}
    >
      {/* <Minimap /> */}
      <Scroll>
        {
          urls.map((url, i) => <Item key={i} index={i} position={[i * xW, 0, 0]} scale={[w, 150, 1]} url={url} />) /* prettier-ignore */
        }
      </Scroll>
    </ScrollControls>
  );
}

export const ContentSlide = () => {
  return (
    <>
      <group position={[0, 11, 60]}>
        <Items />
      </group>
    </>
  );
};
