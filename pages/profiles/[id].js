import Head from "next/head";
import { useEffect } from "react";
import { API_URL, NEXT_URL } from "@/config/index";

const Profile = ({ title, ogTitle, ogImage, ogDescription, id, city }) => {
  useEffect(() => console.log(id));

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={ogTitle} />
        <meta
          property="og:url"
          content={`https://wouldbee.vercel.app/profiles/${id}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:image"
          content={`${NEXT_URL}/Images/wouldbee1.png`}
        />
        <meta property="og:site_name" content="Wouldbee.com" />
        <link
          rel="image_src"
          href="https://beta.flywichita.com/wp-content/uploads/2017/12/1200x630.png"
        />
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
      id: data.id,
      city: data.city,
    },
  };
}
