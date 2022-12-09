import Head from "next/head";
import css from "styled-jsx/css";
import styles from "../styles/Home.module.css";
import { Canvas, useLoader } from "@react-three/fiber";
import Sphere from "@/components/Sphere/Sphere.js";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useEffect, useState } from "react";

function Home({ data }) {
  const { posts } = data.response;
  // console.log(posts[0].photos[0].original_size.url);
  // const [posts, setPosts] = useState(posts)
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    let data = [];

    posts.map((post, i) => {
      data.push({
        key: i,
        id: post.id_string,
        timestamp: post.timestamp,
        image: post.photos[0].original_size.url,
        caption: post.caption,
        url: post.short_url,
      });
    });

    setFilteredPosts(data);
  }, [posts]);

  console.log(filteredPosts);

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Living Digital Archives</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* {posts?.map((post) => {
        return (
          <div key={post.id}>
            <div dangerouslySetInnerHTML={{ __html: post.caption }} />
            <img src={post.photos[0].original_size.url} />
          </div>
        );
      })} */}

        <div className={styles.scene}>
          <Canvas className={styles.canvas} shadows={true}>
            <OrbitControls />
            <ambientLight color={"white"} intensity={0.3} />
            <fog attach="fog" args={["black", 30, 80]} />
            <color attach="background" args={["black"]} />
            {posts?.map((post, index) => {
              return (
                <mesh
                  key={post.id}
                  position={[
                    Math.random() * 100 - 50,
                    index * 2 - 50,
                    Math.random() * 100 - 50,
                  ]}
                  scale={3}
                >
                  <sphereBufferGeometry />
                  <meshBasicMaterial
                    // map={}
                    wireframe
                  />
                </mesh>
              );
            })}
            <gridHelper />
            <axesHelper />
          </Canvas>
        </div>
      </div>
    </>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `https://api.tumblr.com/v2/blog/oneterabyteofkilobyteage.tumblr.com/posts/photo?api_key=${process.env.API_KEY}&limit=50`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Home;