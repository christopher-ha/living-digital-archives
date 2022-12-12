import { useRouter } from "next/router";
import styles from "@/styles/pages/Home.module.scss";

export default function Form() {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputValue = event.target.elements.profile.value;

    // const parseURL = (url) => {
    //   const parsedURL = new URL(url);
    //   if (parsedURL.hostname.includes(".tumblr.com")) {
    //     return parsedURL.hostname.split(".")[0];
    //   } else {
    //     return console.error("This is not a Tumblr URL");
    //   }
    // };

    const isValidURL = (string) => {
      let url;

      try {
        url = new URL(string);
        return url.hostname;
      } catch (_) {
        return false;
      }
    };

    let username;

    // If the input is a URL with https://
    if (isValidURL(inputValue)) {
      // Check if it's a tumblr url
      if (inputValue.includes(".tumblr.com")) {
        // If it is, we return the username.
        username = isValidURL(inputValue).split(".")[0];
      } else {
        // If it's not, then we return an error.
        console.error("This is not a Tumblr URL");
      }
      // We still check if it at least includes .tumblr.com (because if someone types username.tumblr.com without https://, it still fails the url check)
    } else if (inputValue.includes(".tumblr.com")) {
      username = inputValue.split(".")[0];
      // If it is not a https:// url, or a .tumblr.com url, then it must be a username.
    } else {
      username = inputValue;
    }

    router.push({
      pathname: router.pathname,
      query: { profile: username },
    });
  };

  return (
    <form className={styles.input} onSubmit={handleSubmit}>
      <input
        type="text"
        name="profile"
        placeholder="Paste your Tumblr handle"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
