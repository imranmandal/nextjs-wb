import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/404.module.css";

const NotFound = () => {
  return (
    <>
      <Layout title="404!! Not Found">
        <div className={styles.container}>
          <h1 className={styles.heading}>404!!</h1>
          <h5>Not Found</h5>
          <Link href="/">
            <button className="btn btn-lg btn-pink rounded-pill shadow">
              Take me home
            </button>
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default NotFound;
