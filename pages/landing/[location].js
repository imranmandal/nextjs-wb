import Home from "../index";

function AlternateHomePage({ wideImg, portraitImg, communityName }) {
  return (
    <Home
      communityName={communityName}
      wideImg={wideImg}
      portraitImg={portraitImg}
    />
  );
}

export default AlternateHomePage;

export async function getStaticPaths() {
  const paths = [
    "/landing/punjabi-matrimony",
    "/landing/baniya-matrimony",
    "/landing/jain-matrimony",
    "/landing/marathi-matrimony",
    "/landing/south-matrimony",
    "/landing/muslim-matrimony",
    "/landing/christian-matrimony",
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
      communityName: `${location.split("-")[0]}`,
    },
    revalidate: 1,
  };
}
