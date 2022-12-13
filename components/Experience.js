import {
  Bounds,
  useBounds,
  OrbitControls,
  Environment,
} from "@react-three/drei";
import Sphere from "@/components/Sphere";

export default function Experience({ filteredPosts }) {
  return (
    <>
      <Environment preset="studio" blur={1} resolution={32} />
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
          <group>
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
function SelectToZoom({ children, post }) {
  const api = useBounds();
  const isMobile = window.innerWidth <= 600;

  return (
    <group
      onClick={(e) => (
        e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit()
      )}
      // onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}
      // If the user is on mobile, disable recentering the camera when the user taps onto canvas. During testing it created a negative user experience due to a smaller screen, but works great on desktop.
      onPointerMissed={(e) => {
        // if (isMobile) {
        //   e.button === 0 && api.refresh();
        // } else {
        // e.button === 0 &&
        //   api.refresh().to({ position: [0, 0, 0], target: [0, 0, 0] });
        // }
        e.button === 0 && api.refresh();
      }}
    >
      {children}
    </group>
  );
}
