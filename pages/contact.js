import SubContact from "@/components/SubContact";
import styles from "@/styles/Contact.module.css";
import { FaComments } from "react-icons/fa";
import Layout from "@/components/Layout";

function ContactUs() {
  return (
    <>
      <Layout title="Contact us">
        <div className="page">
          <h1>Contact Us</h1>
          <div className={styles.sub_contact_container}>
            <SubContact
              icon={<FaComments />}
              title="Help & Support"
              para="If you have anything to share about your experience on the app, facing an error or need support with your profile, we are here to help!"
              email="support@wouldbee.com"
            />
            <SubContact
              icon={<FaComments />}
              title="Success Stories"
              para="Did you find your Would-Be on Would Bee? We would love to hear all about it!"
              email="connect@wouldbee.com"
            />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default ContactUs;
