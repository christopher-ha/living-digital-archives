import styles from "@/styles/pages/Home.module.scss";
import Form from "@/components/Form";
import Body from "../components/Body";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

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

const filterPosts = (posts) => {
  let data = [];

  posts.map((post, i) => {
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

  return data.reverse();
};

async function getData(profile) {
  let data = {};
  let isInvalid = false;

  if (profile) {
    const res = await fetch(
      `https://api.tumblr.com/v2/blog/${profile}.tumblr.com/posts/photo?api_key=${process.env.API_KEY}&limit=50`
    );
    // If the Tumblr blog exists (200), send the data
    if (res.status === 200) {
      data = await res.json();
      // If the Tumblr blog doesn't exist (404), throw error and send data from oneterabytekilobyteage
    } else if (res.status === 404) {
      isInvalid = true;
      console.error(`There is no Tumblr blog with the username ${profile}`);
      const res = await fetch(
        `https://api.tumblr.com/v2/blog/oneterabyteofkilobyteage.tumblr.com/posts/photo?api_key=${process.env.API_KEY}&limit=50`
      );
      data = await res.json();
    }
  } else {
    const res = await fetch(
      `https://api.tumblr.com/v2/blog/oneterabyteofkilobyteage.tumblr.com/posts/photo?api_key=${process.env.API_KEY}&limit=50`
    );
    data = await res.json();
  }

  return {
    blog: data.response.blog.url,
    filteredPosts: filterPosts(data.response.posts),
    isInvalid: isInvalid,
  };
}

export default async function Home({ searchParams }) {
  const profile = searchParams.profile;
  const data = await getData(profile);

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
                : data.blog}
            </p>
          </div>
        )}
      </div>

      <Body filteredPosts={data.filteredPosts} />

      <footer className={styles.footer}>
        <div className={styles.credits}>
          <p>Design & Development @bhris001</p>
        </div>
        <Form isInvalid={data.isInvalid} />
      </footer>
    </div>
  );
}
