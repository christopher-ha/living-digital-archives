import Head from "next/head";
import css from "styled-jsx/css";
import styles from "../styles/Home.module.css";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import Experience from "@/components/Experience";

function Home({ data }) {
  const { posts } = data.response;
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

        <div className={styles.scene}>
          <Canvas
            className={styles.canvas}
            shadows={true}
            // onPointerMissed={() => {
            //   console.log("You missed!");
            // }}
          >
            <Experience filteredPosts={filteredPosts} />
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
