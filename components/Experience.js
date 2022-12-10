import { Canvas, useThree, extend, useFrame } from "@react-three/fiber";
import { Bounds, useBounds, OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import Sphere from "@/components/Sphere";

export default function Experience({ filteredPosts }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    // groupRef.current.rotation.y += delta * 0.05;
    // sphereRef.current.rotation.y += delta;
  });

  return (
    <>
      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.75}
      />
      <ambientLight color={"white"} intensity={0.3} />
      <fog attach="fog" args={["white", 10, 75]} />
      <color attach="background" args={["white"]} />

      <Bounds>
        <SelectToZoom>
          <group ref={groupRef}>
            {filteredPosts?.map((post, index) => {
              return <Sphere key={post.id} post={post} index={index} />;
            })}
            {/* <gridHelper />
            <axesHelper /> */}
          </group>
        </SelectToZoom>
      </Bounds>
    </>
  );
}

// This component wraps children in a group with a click handler
// Clicking any object will refresh and fit bounds
function SelectToZoom({ children }) {
  const api = useBounds();
  return (
    <group
      onClick={(e) => (
        e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit()
      )}
      // onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}
      onPointerMissed={(e) =>
        e.button === 0 &&
        api.refresh().to({ position: [0, 0, 0], target: [0, 0, 0] })
      }
    >
      {children}
    </group>
  );
}
