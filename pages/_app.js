import "../styles/globals.css";
import { NotificationProvider } from "../src/contexts/NotificationProvider";
import Script from "next/script";
import Head from "next/head";
import { Web3Provider } from "@ethersproject/providers";
import ToastProvider from "../src/providers/toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Bond - Decentralized lending and borrowing platform</title>
        <meta httpEquiv="Content-Security-Policy" />
      </Head>

      <NotificationProvider>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </NotificationProvider>
    </>
  );
}

export default MyApp;
