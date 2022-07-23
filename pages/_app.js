import "../styles/globals.css";
import { NotificationProvider } from "../src/contexts/NotificationProvider";
// import ToastProvider from "src/providers/toast";
// import { MetaversalAccountProvider } from "src/contexts/useMetaversalAccount";
import Script from "next/script";
import Head from "next/head";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
// import { ModalProvider } from "src/contexts/useModalProvider";

function getLibrary(provider) {
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Bond - Decentralized lending and borrowing platform</title>
        <meta
          httpEquiv='Content-Security-Policy'
        />
      </Head>

      <Script src='/analytics.js' strategy='lazyOnload' />
      <Script src='/analyticsUniversal.js' strategy='lazyOnload' />

      <Web3ReactProvider getLibrary={getLibrary}>
        <NotificationProvider>
          {/* <MetaversalAccountProvider> */}
            {/* <ModalProvider> */}
              {/* <ToastProvider> */}
                <Component {...pageProps} />
              {/* </ToastProvider> */}
            {/* </ModalProvider> */}
          {/* </MetaversalAccountProvider> */}
        </NotificationProvider>
      </Web3ReactProvider>
    </>
  );
}

export default MyApp
