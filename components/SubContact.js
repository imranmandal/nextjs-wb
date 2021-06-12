import Link from "next/link";
import styles from "@/styles/Contact.module.css";
import { HiMail } from "react-icons/hi";

function SubContact(props) {
  const { email, icon, para, title } = props;
  const mail = "mailto:" + email;

  return (
    <div className={styles.sub_contact}>
      <i>{icon}</i>
      <h3>{title}</h3>
      <p>{para}</p>
      <p>
        <HiMail className="mr-2" />
        <Link href={mail}>{email}</Link>
      </p>
    </div>
  );
}

export default SubContact;
