import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { Camera } from "three";

export default function Sphere({ post, index }) {
  const sphereRef = useRef();

  useFrame((state, delta) => {
    sphereRef.current.rotation.y += delta * 0.1;
    // sphereRef.lookAt(state.camera.position);
    // sphereRef.current.scale += delta;
    // sphereRef.current.rotation.x += delta;
    // sphereRef.current.rotation.z += delta;
  });

  // const eventHandler = () => {
  //   console.log("event occured");
  // };

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
      // onClick={eventHandler}
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
