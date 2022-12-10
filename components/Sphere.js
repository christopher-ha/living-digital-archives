import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { Camera } from "three";
import Link from "next/link";
import { MeshReflectorMaterial } from "@react-three/drei";

export default function Sphere({ post, index }) {
  const sphereRef = useRef();
  const isClicked = useRef(false);
  // const [isClicked, setIsClicked] = useState(false);

  useFrame((state, delta) => {
    sphereRef.current.rotation.y += delta * 0.1;
  });

  const handleClick = () => {
    if (isClicked.current === false) {
      return (isClicked.current = true);
    } else {
      console.log("hit");
      // window.open(post.url);
    }
  };

  return (
    <mesh
      key={post.id}
      position={[
        Math.random() * 100 - 50,
        index * 2 - 50,
        Math.random() * 100 - 50,
      ]}
      scale={5}
      ref={sphereRef}
      onClick={handleClick}
      // onPointerDown={() => {
      //   pointerDownTimeStamp;
      // }}
    >
      <sphereBufferGeometry />
      <meshPhysicalMaterial
        map={new TextureLoader().load(post.image)}
        roughness={1}
        metalness={0.05}
        clearcoat={0.05}
      />
    </mesh>
  );
}
