import Head from "next/head";
import { useEffect, useState } from "react";
import { API_URL, NEXT_URL } from "@/config/index";
import {
  AnnualIncome,
  Degrees,
  gender as Gender,
  MaritalStatus,
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
  degree,
  degrees,
  occupation,
  income,
  city,
  state,
  country,
  displayPictureUrl,
}) => {
  const details = [
    lastName,
    Gender[gender - 1],
    age ? `Age ${age}` : null,
    convertedHeight(height),
    convertedCapitalizeValue(Religion[religion - 1]),
    convertedCapitalizeValue(MaritalStatus[maritalStatus - 1]),
    convertedValue(degrees),
    convertedCapitalizeValue(AnnualIncome[income - 1]),
    convertedValue(Occupation[occupation]),
    city,
    state,
    country,
  ];

  console.log({
    uid,
    id,
    lastName,
    gender,
    age,
    motherTongue,
    maritalStatus,
    height,
    religion,
    degree,
    degrees,
    occupation,
    income,
    city,
    state,
    country,
    displayPictureUrl,
  });

  const [description, setDescription] = useState(
    details
      .filter((detail) => {
        if (detail) {
          return detail;
        }
      })
      .join(" | ")
  );

  // useEffect(() => console.log(id));

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={id + " " + lastName || ogTitle} />
        <meta
          property="og:url"
          content={`https://wouldbee.vercel.app/profiles/${uid}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:image"
          itemProp="image"
          content={
            displayPictureUrl || `${NEXT_URL}/Images/bg-landscape-desktop.jpg`
          }
        />
        <meta
          property="og:image"
          itemProp="image"
          content={
            displayPictureUrl ||
            `${NEXT_URL}/thumbnail/bg-landscape-desktop.jpg`
          }
        />

        <meta
          property="og:image:secure_url"
          content={
            displayPictureUrl || `${NEXT_URL}/Images/bg-landscape-desktop.jpg`
          }
        />
        <meta
          property="og:image:secure_url"
          content={
            displayPictureUrl ||
            `${NEXT_URL}/thumbnail/bg-landscape-desktop.jpg`
          }
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />
        <meta property="og:image:alt" content="Profile Picture" />
        <meta property="og:site_name" content="Wouldbee.com" />
        <meta property="fb:app_id" content="3074679522638036" />
        <link
          rel="image_src"
          href={
            displayPictureUrl ||
            `${NEXT_URL}/thumbnail/bg-landscape-desktop.jpg`
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
      <div className="d-flex justify-content-around mx-auto">
        <div className="page my-5 py-5 text-center bg-light shadow-lg rounded w-75 w-sm-50">
          {Object.keys(details).map((data) => {
            return <p>{details[data]}</p>;
          })}
          {/* <h1>{id}</h1>
          <h3>{lastName}</h3>
          <p>{city}</p>
          <p>{state}</p>
          <p>{country}</p> */}
        </div>
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
  console.log(data);

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
      degree: data.degree,
      occupation: data.occupation,
      income: data.income,
      city: data.city,
      state: data.state,
      country: data.country,
      displayPictureUrl: data.displayPictureUrl,
      // uid: id,
      // data,
    },
  };
}
