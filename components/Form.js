import { useRouter } from "next/router";
import styles from "@/styles/pages/Home.module.scss";

export default function Form() {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(event.target);

    const inputValue = event.target.elements.profile.value;

    router.push({
      pathname: router.pathname,
      query: { profile: inputValue },
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
