import styles from "@/styles/pages/Home.module.scss";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState, Suspense } from "react";
import Experience from "@/components/Experience";
import Form from "@/components/Form";
import { useRouter } from "next/router";

async function getData(profile) {
  let isInvalid = false;
  console.log(profile);

  // Initialize data (can't do const data  =  ... inside of if/else)
  let data;

  // If there is a profile name in query params, use that profile as the source for all our images.
  if (profile) {
    const res = await fetch(
      `https://api.tumblr.com/v2/blog/${profile}.tumblr.com/posts/photo?api_key=${process.env.NEXT_PUBLIC_API_KEY}&limit=50`
    );

    // If the Tumblr blog exists (200), send the data
    if (res.status === 200) {
      data = await res.json();
      // If the Tumblr blog doesn't exist (404), throw error and send data from oneterabytekilobyteage
    } else if (res.status === 404) {
      console.error(`There is no Tumblr blog with the username ${profile}`);
      isInvalid = true;
      const res = await fetch(
        `https://api.tumblr.com/v2/blog/oneterabyteofkilobyteage.tumblr.com/posts/photo?api_key=${process.env.NEXT_PUBLIC_API_KEY}&limit=50`
      );
      data = await res.json();
    }

    // If the query params are empty, default to oneterabyteofkilobyteage.
  } else {
    const res = await fetch(
      `https://api.tumblr.com/v2/blog/oneterabyteofkilobyteage.tumblr.com/posts/photo?api_key=${process.env.NEXT_PUBLIC_API_KEY}&limit=50`
    );
    data = await res.json();
  }

  return { data, isInvalid };
}

export default function Home() {
  const router = useRouter();
  const [blog, setBlog] = useState();
  const [posts, setPosts] = useState();
  const [isInvalid, setIsInvalid] = useState();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const profile = router.query.profile;

  const extractFirstTumblrUrl = (string) => {
    // Use a regular expression to find the first url in the string that
    // starts with "https://64.media.tumblr.com/"

    const regex = /https:\/\/64\.media\.tumblr\.com\/[^\s]+/;
    const matches = string.match(regex);
    if (matches && matches.length > 0) {
      // Remove any quotation mark at the end of the first match
      const url = matches[0].replace(/\"$/, "");
      // Return the url without the quotation mark
      return url;
    } else {
      // Return null if no match is found
      return null;
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, isInvalid } = await getData(profile);
        setBlog(data.response.blog);
        setPosts(data.response.posts);
        setIsInvalid(isInvalid);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [profile]);

  useEffect(() => {
    let data = [];

    posts?.map((post, i) => {
      // If the type is photo, we extract the first image url from the photos array.
      if (post.type === "photo") {
        data.push({
          key: i,
          id: post.id_string,
          timestamp: post.timestamp,
          image: post.photos[0].alt_sizes[1].url,
          summary: post.summary,
          url: post.short_url,
        });
        // If the type is text, we extract the first image URL in the body of the text.
      } else if (post.type === "text") {
        data.push({
          key: i,
          id: post.id_string,
          timestamp: post.timestamp,
          image: extractFirstTumblrUrl(post.body),
          summary: post.summary,
          url: post.short_url,
        });
      }
    });
    // Reverse the data to make the newest items on top of the scene
    setFilteredPosts(data.reverse());
  }, [posts]);

  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        {/* If there is no profile in the query, render the description for oneterabytekilobyteage */}
        {profile === undefined ? (
          <p>
            One Terabyte of Kilobyte Age is a project by artists Olia Lialina
            and Dragan Espenschied that is centered around the preservation and
            restoration of websites from GeoCities, the early internet&apos;s
            agora of vernacular design. Screenshots are automatically generated
            from a stash of old Geocities home pages, rescued by the Archive
            Team in 2009. The files are processed from oldest to newest.
          </p>
        ) : (
          <div>
            {/* If there is a profile in the query, render their blog url and avatar */}
            {/* Secret message for Valentina <3 */}
            <p>
              {profile === "vallllentina"
                ? `i can stalk your Tumblr from here now <3 i love you`
                : blog?.url}
            </p>
          </div>
        )}
      </div>

      <footer className={styles.footer}>
        <div className={styles.credits}>
          <p>Design & Development @bhris001</p>
        </div>
        <Form isInvalid={isInvalid} />
      </footer>

      <div className={styles.scene}>
        <Suspense fallback={<p className={styles.loading}>loading ...</p>}>
          <Canvas className={styles.canvas} shadows={true}>
            <Experience filteredPosts={filteredPosts} />
          </Canvas>
        </Suspense>
        {/* <Loader /> */}
      </div>
    </div>
  );
}
