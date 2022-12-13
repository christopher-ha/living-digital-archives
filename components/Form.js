import { useRouter } from "next/router";
import styles from "@/styles/pages/Home.module.scss";

export default function Form() {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputValue = event.target.elements.profile.value.toLowerCase();

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
    <form className={styles.form} onSubmit={handleSubmit} autocomplete="off">
      <input
        className={styles.form__input}
        type="text"
        name="profile"
        placeholder="Paste your Tumblr handle"
        spellcheck="false"
      />
      <button type="submit" className={styles.form__submit}>
        Enter
      </button>
    </form>
  );
}
