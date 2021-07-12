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
    "/wb/marathi",
    "/wb/south",
  ];

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { location } }) {
  return location === "landing-page"
    ? {
        props: {
          wideImg: "/Images/bg-landscape-desktop.jpg",
          portraitImg: "/Images/bg-phone-portrait.jpg",
        },
      }
    : location === "punjabi"
    ? {
        props: {
          wideImg: "/Images/punjabi-landscape.png",
          portraitImg: "/Images/punjabi-phone-portrait.png",
        },
        revalidate: 1,
      }
    : location === "baniya"
    ? {
        props: {
          wideImg: "/Images/baniya-landscape.png",
          portraitImg: "/Images/baniya-phone-portrait.png",
        },
        revalidate: 1,
      }
    : location === "marathi"
    ? {
        props: {
          wideImg: "/Images/marathi-landscape.png",
          portraitImg: "/Images/marathi-phone-portrait.png",
        },
        revalidate: 1,
      }
    : location === "south"
    ? {
        props: {
          wideImg: "/Images/south-india.jpg",
          portraitImg: "/Images/bg-phone-portrait-south.jpeg",
        },
        revalidate: 1,
      }
    : location === "muslim"
    ? {
        props: {
          wideImg: "/Images/muslim-landscape.png",
          portraitImg: "/Images/muslim-phone-portrait.png",
        },
        revalidate: 1,
      }
    : location === "christian"
    ? {
        props: {
          wideImg: "/Images/christian-landscape.png",
          portraitImg: "/Images/christian-phone-portrait.png",
        },
        revalidate: 1,
      }
    : {
        props: {
          wideImg: "/Images/bg-landscape-desktop.jpg",
          portraitImg: "/Images/bg-phone-portrait.jpg",
        },
        revalidate: 1,
      };
}
