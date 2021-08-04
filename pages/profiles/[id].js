import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "@/styles/ProfilesSharing.module.css";
import { API_URL, NEXT_URL } from "@/config/index";
import {
  AnnualIncome,
  Degrees,
  gender as Gender,
  MaritalStatus,
  MotherTongue,
  Occupation,
  Religion,
} from "@/components/FormComponent/FormData";
import {
  convertedCapitalizeValue,
  convertedHeight,
  convertedValue,
} from "@/components/FormComponent/FormFunctions";

const Profile = ({
  title,
  ogTitle,
  ogImage,
  ogDescription,
  // data,
  uid,
  id,
  lastName,
  gender,
  age,
  motherTongue,
  maritalStatus,
  height,
  religion,
  degrees,
  occupation,
  income,
  city,
  state,
  country,
  displayPictureUrl,
}) => {
  const degreesValue = [
    ...[
      degrees?.length > 0
        ? degrees
            .map((degreeIndex) => {
              return convertedValue(Degrees[degreeIndex]);
            })
            .join(", ")
        : "-",
    ],
  ];

  const [details, setDetails] = useState({
    title: `${id} | ${lastName}`,
    picture: displayPictureUrl,
    description: {
      gender: { value: Gender[gender - 1], label: "Gender" },
      age: { value: age ? `${age} Yrs` : null, label: "Age" },
      height: { value: convertedHeight(height), label: "Hieght (in feet)" },
      motherTongue: {
        value: convertedCapitalizeValue(MotherTongue[motherTongue - 1]),
        label: "Mother Tongue",
      },
      religion: {
        value: convertedCapitalizeValue(Religion[religion - 1]),
        label: "Religion",
      },
      maritalStatus: {
        value: convertedCapitalizeValue(MaritalStatus[maritalStatus - 1]),
        label: "Marital Status",
      },
      degrees: { value: degreesValue, label: "Degrees" },
      income: {
        value: convertedCapitalizeValue(AnnualIncome[income - 1]),
        label: "Annual Income",
      },
      occupation: {
        value: convertedValue(Occupation[occupation]),
        label: "Occupation",
      },
      city: { value: city, label: "City" },
      state: { value: state, label: "State" },
      country: { value: country, label: "Country" },
    },
  });

  const notNullDetail = Object.keys(details?.description).filter((detail) => {
    if (details?.description[detail]?.value) {
      return details?.description[detail]?.value;
    }
  });

  const description = notNullDetail
    .map((detail) => {
      return details?.description[detail]?.value;
    })
    .join(" | ");

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={id + " " + lastName || ogTitle} />
        <meta property="og:url" content={`${NEXT_URL}/profiles/${uid}`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="wouldbee.com" />
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:image"
          itemProp="image"
          content={
            displayPictureUrl || `${NEXT_URL}/Images/landing-page-landscape.jpg`
          }
        />
        <meta
          property="og:image"
          itemProp="image"
          content={
            displayPictureUrl ||
            `${NEXT_URL}/ImagePlaceholders/landing-page-landscape.jpg`
          }
        />

        <meta
          property="og:image:secure_url"
          content={
            displayPictureUrl || `${NEXT_URL}/Images/landing-page-landscape.jpg`
          }
        />
        <meta
          property="og:image:secure_url"
          content={
            displayPictureUrl ||
            `${NEXT_URL}/ImagePlaceholders/landing-page-landscape.jpg`
          }
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />
        <meta property="og:image:alt" content="Profile Picture" />
        <meta property="og:site_name" content="wouldbee.com" />
        <meta property="fb:app_id" content="3074679522638036" />
        <link
          rel="image_src"
          href={
            displayPictureUrl ||
            `${NEXT_URL}/ImagePlaceholders/landing-page-landscape.jpg`
          }
        />
        <link
          rel="apple-touch-icon"
          sizes="32x32"
          href={NEXT_URL + "/favicon-06.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href={NEXT_URL + "/favicon-09.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="72x72"
          href={NEXT_URL + "/favicon-10.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href={NEXT_URL + "/favicon-11.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href={NEXT_URL + "/favicon-13.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={NEXT_URL + "/favicon-14.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="144x144"
          href={NEXT_URL + "/favicon-15.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="196x196"
          href={NEXT_URL + "/favicon-16.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="72x72"
          href={NEXT_URL + "/favicon-17.png"}
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.containerInner}>
          <div className={styles.logo}>
            <img src={`${NEXT_URL}/Logos/logoWb.png`} alt="Logo" />
          </div>
          <div className={styles.pictureContainer}>
            <img src={details.picture} alt="Profile Picture" />
          </div>
          <div className={styles.detailsContainer}>
            <h2 className={styles.heading}>{details.title}</h2>
            {Object.keys(details.description).map((data, index) => {
              return (
                <div key={index} className={styles.detailContainer}>
                  <label>{details.description[data].label}: </label>
                  <p className={styles.detail}>
                    {details.description[data].value || "-"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <span className={styles.footer}>Copyright © wouldbee.com 2021</span>
      </div>
    </>
  );
};

Profile.defaultProps = {
  id: "",
  title:
    "Would Bee - Free Matrimony & Match Making, Jeevansathi Search for Shaadi in Bharat",
  ogTitle:
    "Would Bee - Free Matrimony & Match Making, Jeevansathi Search for Shaadi in Bharat",

  ogImage:
    "https://beta.flywichita.com/wp-content/uploads/2017/12/1200x630.png",
  ogDescription: "",
};

export default Profile;

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/profiles/${id}`);

//   const data = await res.json();

//   const paths = data.map((d) => ({
//     params: { id: d.id },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/profiles/${id}`);

  const data = await res.json();

  return {
    props: {
      uid: id,
      id: data.id,
      lastName: data.lastName,
      gender: data.gender,
      age: data.age,
      motherTongue: data.motherTongue,
      maritalStatus: data.maritalStatus,
      height: data.height,
      religion: data.religion,
      degrees: data.degrees,
      occupation: data.occupation,
      income: data.income,
      city: data.city,
      state: data.state,
      country: data.country,
      displayPictureUrl: data.displayPictureUrl,
    },
  };
}
