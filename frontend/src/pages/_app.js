import "../../styles/main.css"
import 'bootstrap/dist/css/bootstrap.css';
import Head from "next/head";
import { SessionProvider } from "next-auth/react"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import { useEffect } from "react";

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
    
    return (
        <>
            <StyleSheetManager shouldForwardProp={isPropValid}>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>
                <SessionProvider session={session}>
                    <Component {...pageProps} />
                    <ToastContainer />
                </SessionProvider>
            </StyleSheetManager>
        </>
    )
}