import Layout from "@/components/Layout";
import styles from "@/styles/About.module.css";

function About() {
  return (
    <>
      <Layout title="About us">
        <div className="page">
          <div className={styles.about}>
            <h1>About us</h1>
            <p>
              Would Bee is embarking on a journey to make digital matrimony safe
              and affordable for every Indian. India has no dearth of
              matchmaking & matrimony services, including both offline and
              online ones. Would Bee is our sincere attempt to address their
              shortcomings.{" "}
            </p>
            <p>
              We are passionate about leveraging latest AI & Blockchain
              technologies to disrupt the Indian Matrimony market and deliver a
              cutting-edge product.
            </p>
            <p>
              Our deep cultural values and the dream of improving society
              remains the key driving force behind our startup. Our vision is to
              build products that people would trust and love for simplifying
              their lives.
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default About;
