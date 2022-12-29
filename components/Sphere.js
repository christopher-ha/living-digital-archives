import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { Float } from "@react-three/drei";

export default function Sphere({ post, index }) {
  const sphereRef = useRef();
  const isFocussed = useRef(false);
  const pointerDownTimestampRef = useRef();
  const pointerUpTimestampRef = useRef();

  useFrame((state, delta) => {
    sphereRef.current.rotation.y += delta * 0.1;
  });

  const handleClick = () => {
    // Subtract the time between the user ending their click and starting it. If it's less than 100ms (usually a click is around 60ms), then register it as a click.
    // If they drag around the scene to orbit the camera, this value will be 1000ms+ typically. We do not want to register a click under those conditions.
    const isClick =
      pointerUpTimestampRef.current - pointerDownTimestampRef.current < 100;

    // If the user puts the object in focus, then set isFocussed to true
    if (isFocussed.current === false) {
      isFocussed.current = true;
      // If the object is in focus, and the user has clicked and not dragged, then open the original post in a new window and set the focus back to false so the user doens't get redirected when they tap again to refocus the object
    } else if (isFocussed.current === true && isClick === true) {
      window.open(post.url);
      isFocussed.current = false;
    }
  };

  return (
    <Float>
      <mesh
        key={post.id}
        position={[
          Math.random() * 100 + -50,
          index * 2 - 50,
          Math.random() * 100 + -50,
        ]}
        scale={6.5}
        ref={sphereRef}
        onClick={handleClick}
        // Store the time of the user beginning their click
        onPointerDown={() => {
          pointerDownTimestampRef.current = Date.now();
        }}
        // Store the time of the user ending their click
        onPointerUp={() => {
          pointerUpTimestampRef.current = Date.now();
        }}
        // When clicking off the object to another sphere or on the canvas, reset the focus back to false.
        onPointerMissed={() => {
          isFocussed.current = false;
        }}
      >
        <sphereGeometry />
        <meshPhysicalMaterial
          map={new TextureLoader().load(post.image)}
          roughness={1}
          metalness={0.05}
          clearcoat={0.01}
        />
      </mesh>
    </Float>
  );
}
