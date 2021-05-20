// import '../styles/globals.css'
import BaseLayout from "../components/layouts/BaseLayout";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/main.scss";
import "react-datepicker/dist/react-datepicker.css";
import Head from "next/head";
import BasePage from "../components/BasePage/BasePage";
import "slate-simple-editor/dist/index.css";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <BaseLayout className="cover">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,700;1,400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <BasePage className="portfolio-page">
          {" "}
          <Component {...pageProps} />
        </BasePage>
      </BaseLayout>
    </UserProvider>
  );
}

export default MyApp;
