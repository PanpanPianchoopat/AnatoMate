import "../../styles/globals.css";
import "antd/dist/antd.css";
import License from "../components/License";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <License />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
