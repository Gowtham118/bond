import "../styles/globals.css";
import { NotificationProvider } from "../src/contexts/NotificationProvider";
import Head from "next/head";
import ToastProvider from "../src/providers/toast";
import {MetamaskProvider} from "../src/connectMetamask/ConnectMetamask";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Bond - Decentralized lending and borrowing platform</title>
        <meta httpEquiv="Content-Security-Policy" />
      </Head>
      <MetamaskProvider>
        <NotificationProvider>
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
        </NotificationProvider>
      </MetamaskProvider>
    </>
  );
}

export default MyApp;
