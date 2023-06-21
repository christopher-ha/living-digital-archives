"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Experience from "@/components/Experience";
import styles from "@/styles/pages/Home.module.scss";

export default function Body({ filteredPosts }) {
  // console.log("body:", filteredPosts);
  return (
    <div className={styles.scene}>
      <Suspense fallback={<p className={styles.loading}>loading ...</p>}>
        <Canvas className={styles.canvas} shadows={true}>
          <Experience filteredPosts={filteredPosts} />
        </Canvas>
      </Suspense>
      {/* <Loader /> */}
    </div>
  );
}
