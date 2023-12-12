import Post from "../Post/Post";
import styles from "./Home.module.scss";

function Home() {
  return (
    <ul className={styles.posts}>
      <Post />
    </ul>
  );
}

export default Home;
