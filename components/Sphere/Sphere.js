import { useLoader } from "@react-three/fiber";
import React from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function Sphere(props) {
  // const texture = useLoader(THREE.TextureLoader, img);
  return (
    <mesh {...props}>
      <sphereBufferGeometry />
      <meshBasicMaterial color={"black"} wireframe />
    </mesh>
  );
}
