import Head from "next/head";
import { useEffect } from "react";
import { API_URL } from "@/config/index";

const Profile = ({ title, ogTitle, ogImage, ogDescription, id, city }) => {
  useEffect(() => console.log(id));

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:url" content={ogImage} />
        <meta
          property="og:image"
          content={`https://wouldbee.vercel.app/profiles/${id}`}
        />
        <meta property="og:type" content="profile" />
        <meta property="og:description" content={ogDescription} />
      </Head>
      <h1>{id}</h1>
      <p>{city}</p>
    </>
  );
};

Profile.defaultProps = {
  id: "",
  title:
    "Would Bee - Free Matrimony & Match Making, Jeevansathi Search for Shaadi in Bharat",
  ogTitle: "Open Graph Meta Tags: Everything You Need to Know",

  ogImage:
    "https://sa-wb-test.s3.ap-south-1.amazonaws.com/46b35cf2-40d9-4bfc-aeb8-181fd6f67d30_picture_1623516425422-1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5YKYKQ4AZUWIQODB%2F20210614%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20210614T095457Z&X-Amz-Expires=30&X-Amz-Signature=465e691393242063880d7a40bdab3678fe5133f87e6fa2aa9b756eb9df13c62e&X-Amz-SignedHeaders=host",
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
      id: data.id,
      city: data.city,
    },
  };
}
