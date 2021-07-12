import Home from "../index";

function AlternateHomePage({ wideImg, portraitImg }) {
  return <Home wideImg={wideImg} portraitImg={portraitImg} />;
}

export default AlternateHomePage;

export async function getStaticPaths() {
  const paths = [
    "/wb/landing-page",
    "/wb/punjabi",
    "/wb/baniya",
    "/wb/jain",
    "/wb/marathi",
    "/wb/south",
    "/wb/muslim",
    "/wb/christian",
  ];

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { location } }) {
  return {
    props: {
      wideImg: `/Images/${location}-landscape.png`,
      portraitImg: `/Images/${location}-phone-portrait.png`,
    },
    revalidate: 1,
  };
}
