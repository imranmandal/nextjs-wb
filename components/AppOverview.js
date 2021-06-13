import Image from "next/image";
import styles from "@/styles/AppOverview.module.css";

const AppOverview = () => {
  return (
    <>
      <section className={styles.detail}>
        {/* <img
          className="fillers leftCornerFiller"
          src={leftCornerFiller}
          alt="leftCornerFiller"
        />
        <img
          className="fillers rightCornerFiller"
          src={rightCornerFiller}
          alt="rightCornerFiller"
        />
        <img className="fillers filler5" src={filler5} alt="filler5" />
        <img className="fillers filler6" src={filler6} alt="filler6" /> */}

        <div className={styles.para1}>
          <div className={styles.content}>
            <h3 className="text-capitalize">
              truly free matrimony app - Zero payments
            </h3>
            <p>
              Every matrimony app offers free registration but asks for money to
              connect you to potential matches. Not us!
            </p>
          </div>
          {/* 
          <Image
            className={styles.img}
            src="/Images/phone1.png"
            alt="phone-screen"
            width={300}
            height={500}
          /> */}

          <div className={styles.img}>
            <Image
              src="/Images/phone1.png"
              alt="phone"
              layout="fill"
              objectFit="contain"
            />
          </div>
          {/* <img src="/Images/phone1.png" alt="phoneScreen" /> */}
          {/* <img className="fillers filler1" src={filler1} alt="branches" /> */}
        </div>

        <div className={styles.para2}>
          <div className={styles.content}>
            <h3 className="text-capitalize">free yet SAFE</h3>
            <p>
              We are fanatic about our users' safety. We take all possible
              measures to keep Fraudsters and Scammers away.
            </p>
          </div>

          <div className={styles.img}>
            <Image
              src="/Images/phone2.png"
              alt="phone"
              layout="fill"
              objectFit="contain"
            />
          </div>

          {/* <img className="fillers filler1" src={filler1} alt="branches" /> */}
        </div>
        <div className={styles.para3}>
          <div className={styles.content}>
            <h3 className="text-capitalize">smart compatibility </h3>
            <p>
              Check your compatibility score based on our proprietary
              compatibility calculator.
            </p>
          </div>

          <div className={styles.img}>
            <Image
              src="/Images/phone3.png"
              alt="phone"
              layout="fill"
              objectFit="contain"
            />
          </div>

          {/* <img className="fillers filler1" src={filler1} alt="branches" /> */}
        </div>
        <div className={styles.para4}>
          <div className={styles.content}>
            <h3 className="text-capitalize">Take control of your privacy</h3>
            <p>
              You are in full control of your privacy. You decide who can see
              your information and how much information to reveal.
            </p>
          </div>

          <div className={styles.img}>
            <Image
              src="/Images/phone4.png"
              alt="phone"
              layout="fill"
              objectFit="contain"
            />
          </div>

          {/* <img className="fillers filler1" src={filler1} alt="branches" /> */}
        </div>
      </section>
    </>
  );
};

export default AppOverview;
