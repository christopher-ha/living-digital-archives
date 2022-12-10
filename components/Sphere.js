import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { Camera } from "three";
import Link from "next/link";

export default function Sphere({ post, index }) {
  const sphereRef = useRef();
  // const [isClicked, setIsClicked] = useState(false);

  useFrame((state, delta) => {
    sphereRef.current.rotation.y += delta * 0.1;
  });

  let isClicked = false;

  const handleClick = () => {
    if (isClicked === false) {
      return (isClicked = true);
    } else {
      window.open(post.url);
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
    >
      <sphereBufferGeometry />
      <meshPhysicalMaterial
        map={new TextureLoader().load(post.image)}
        metalness={0.2}
        roughness={0}
        clearcoat={0.8}
      />
    </mesh>
  );
}
