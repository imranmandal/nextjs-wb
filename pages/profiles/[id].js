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
    gender,
    convertedHeight(height),
    convertedValue(Religion[religion]),
    convertedValue(MaritalStatus[maritalStatus]),
    convertedValue(degrees),
    convertedValue(AnnualIncome[income]),
    convertedValue(Occupation[occupation]),
    city,
    state,
    country,
  ];

  const [description, setDescription] = useState(
    setDescription(
      details
        .filter((detail) => {
          if (detail) {
            return detail;
          }
        })
        .join(" | ")
    )
  );
  // useEffect(() => {
  //   console.log(id);

  //   console.log(details);
  // });

  // useEffect(() => {
  //   if (details) {
  //     setDescription(
  //       details
  //         .filter((detail) => {
  //           if (detail) {
  //             return detail;
  //           }
  //         })
  //         .join(" | ")
  //     );
  //   }
  // });

  return (
    <>
      {/* Name | Gender | Age | Height | Caste | Religion | Marital-Status | Degrees | Designation | CTC | City */}
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={id + " " + lastName || ogTitle} />
        <meta property="og:url" content={`${NEXT_URL}/profiles/${uid}`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:image"
          itemProp="image"
          content={`${NEXT_URL}/Images/bg-landscape-desktop.jpg`}
        />
        <meta
          property="og:image"
          itemProp="image"
          content={`${NEXT_URL}/thumbnail/bg-landscape-desktop.jpg`}
        />

        <meta
          property="og:image:secure_url"
          content={`${NEXT_URL}/Images/bg-landscape-desktop.jpg`}
        />
        <meta
          property="og:image:secure_url"
          content={`${NEXT_URL}/thumbnail/bg-landscape-desktop.jpg`}
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />
        <meta
          property="og:image:alt"
          content="A shiny red apple with a bite taken out"
        />
        <meta property="og:logo" content={`${NEXT_URL}/Images/logo.png`} />
        <meta property="og:site_name" content="wouldbee.com" />
        <meta property="fb:app_id" content="3074679522638036" />
        <link
          rel="image_src"
          href={`${NEXT_URL}/thumbnail/bg-landscape-desktop.jpg`}
        />
      </Head>
      {/* <Layout> */}
      <div className="d-flex justify-content-around mx-auto">
        <div className="page my-5 py-5 text-center bg-light shadow-lg rounded w-75 w-sm-50">
          <h1>{id}</h1>
          <h3>{lastName}</h3>
          <p>{city}</p>
          <p>{state}</p>
          <p>{country}</p>
        </div>
      </div>
      {/* </Layout> */}
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
  ogDescription:
    "Learn about 13 features that set Ahrefs apart from the competition.",
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
