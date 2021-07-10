import Image from "next/image";
import styles from "@/styles/AppOverview.module.css";

const phone1 = "/Images/phone1.png";
const phone2 = "/Images/phone2.png";
const phone3 = "/Images/phone3.png";
const phone4 = "/Images/phone4.png";

const AppOverview = () => {
  return (
    <>
      <section className={styles.detail}>
        <div className={styles.leftCornerFiller}>
          <div className={styles.first}></div>
          <div className={styles.second}></div>
          <div className={styles.third}></div>
        </div>
        <div className={styles.rightCornerFiller}>
          <div className={styles.first}></div>
          <div className={styles.second}></div>
          <div className={styles.third}></div>
        </div>
        <div className={styles.filler5}>
          <div className={styles.first}></div>
        </div>
        <div className={styles.filler6}>
          <div className={styles.first}></div>
        </div>
        <div className={styles.filler7}>
          <div className={styles.first}></div>
        </div>

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

          <div className={styles.phone}>
            <Image src={phone1} alt="phone" layout="fill" objectFit="contain" />
          </div>
          <div className={styles.filler1}>
            <div className={styles.first}></div>
            <div className={styles.second}></div>
          </div>
        </div>

        <div className={styles.para2}>
          <div className={styles.content}>
            <h3 className="text-capitalize">free yet SAFE</h3>
            <p>
              We are fanatic about our users' safety. We take all possible
              measures to keep Fraudsters and Scammers away.
            </p>
          </div>

          <div className={styles.phone}>
            <Image src={phone2} alt="phone" layout="fill" objectFit="contain" />
          </div>
          <div className={styles.filler2}>
            <div className={styles.first}></div>
            <div className={styles.second}></div>
          </div>
        </div>
        <div className={styles.para3}>
          <div className={styles.content}>
            <h3 className="text-capitalize">smart compatibility </h3>
            <p>
              Check your compatibility score based on our proprietary
              compatibility calculator.
            </p>
          </div>

          <div className={styles.phone}>
            <Image src={phone3} alt="phone" layout="fill" objectFit="contain" />
          </div>
          <div className={styles.filler3}>
            <div className={styles.first}></div>
            <div className={styles.second}></div>
          </div>
        </div>
        <div className={styles.para4}>
          <div className={styles.content}>
            <h3 className="text-capitalize">Take control of your privacy</h3>
            <p>
              You are in full control of your privacy. You decide who can see
              your information and how much information to reveal.
            </p>
          </div>

          <div className={styles.phone}>
            <Image src={phone4} alt="phone" layout="fill" objectFit="contain" />
          </div>
          <div className={styles.filler4}>
            <div className={styles.first}></div>
            <div className={styles.second}></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AppOverview;
