import Head from "next/head";
import { useEffect } from "react";
import { API_URL, NEXT_URL } from "@/config/index";

const Profile = ({
  title,
  ogTitle,
  ogImage,
  ogDescription,
  id,
  lastName,
  city,
  state,
  country,
}) => {
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
          content={`${NEXT_URL}/Images/bg-landscape-desktop.jpg`}
        />
        {/* <meta property="og:image" content="https://example.com/ogp.jpg" /> */}
        <meta
          property="og:image:secure_url"
          content={`${NEXT_URL}/Images/bg-landscape-desktop.jpg`}
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="450" />
        <meta
          property="og:image:alt"
          content="A shiny red apple with a bite taken out"
        />
        <meta property="og:site_name" content="Wouldbee.com" />
        <link
          rel="image_src"
          href="https://beta.flywichita.com/wp-content/uploads/2017/12/1200x630.png"
        />
      </Head>
      <div className="d-flex justify-content-around mx-auto">
        <div className="page my-5 py-5 text-center bg-light shadow-lg rounded w-50">
          <h1>{id}</h1>
          <h3>{lastName}</h3>
          <p>{city}</p>
          <p>{state}</p>
          <p>{country}</p>
        </div>
      </div>
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
      lastName: data.lastName,
      city: data.city,
      state: data.state,
      country: data.country,
    },
  };
}
