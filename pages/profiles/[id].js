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
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgolBdeaXdt7hZ4G28YiA8shOCg4jkBg08uA&usqp=CAU",
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
