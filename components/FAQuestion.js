import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import styles from "@/styles/FAQ.module.css";

function FAQuestion(props) {
  const [visible, setVisible] = useState(false);

  function handleClick() {
    setVisible((prevValue) => !prevValue);
  }

  return (
    <div className={styles.fa_question}>
      <div onClick={handleClick} className={styles.title}>
        <i>
          <FaPlus className="align-self-start" />
        </i>
        <h5 className="align-self-start">{props.title}</h5>
      </div>

      {visible ? (
        <div className={styles.para}>
          <p>{props.para1}</p>
          <p>{props.para2}</p>
        </div>
      ) : null}
    </div>
  );
}

export default FAQuestion;
