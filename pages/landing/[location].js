import Home from "../index";

function AlternateHomePage({ wideImg, portraitImg, communityName, showVideo }) {
  return (
    <Home
      communityName={communityName}
      wideImg={wideImg}
      portraitImg={portraitImg}
      showVideo={showVideo}
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
    "/landing/bengali-matrimony",
  ];

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { location } }) {
  return {
    props: {
      wideImg: `${location}-landscape`,
      portraitImg: `${location}-phone-portrait`,
      communityName: `${location.split("-")[0]}`,
      showVideo: false,
    },
    revalidate: 1,
  };
}
