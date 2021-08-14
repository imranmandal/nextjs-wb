// bootstrap css
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "context/AuthContext";
import "../styles/globals.css";
import TagManager from "react-gtm-module";
import { useEffect } from "react";
import { TAG_MANAGER_ID } from "@/config/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useEffect } from "react";
// import ReactGA from 'react-ga';

// // set up google analytics
// ReactGA.initialize('UA-189742362-1');
// ReactGA.pageview(window.location.pathname + window.location.search);

// set up google-tag-manager
const tagManagerArgs = {
  gtmId: TAG_MANAGER_ID,
};

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Initializing tag manager
    TagManager.initialize(tagManagerArgs);

    window.dataLayer.push({
      event: "pageview",
    });
  }, []);

  // For page-tracking with React-GA
  // useEffect(() => {
  //   ReactGA.initialize('UA-189742362-1');
  //   ReactGA.pageview(window.location.pathname + window.location.search);
  // })

  // For page-tracking with google-tag-manager
  // ref - https://analystadmin.medium.com/implementing-google-analytics-and-google-tag-manager-into-a-react-js-app-e986579cd0ee

  return (
    <AuthProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
