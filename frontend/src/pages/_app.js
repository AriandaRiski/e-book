import "../../styles/main.css"
import 'bootstrap/dist/css/bootstrap.css';
import Head from "next/head";
import { SessionProvider } from "next-auth/react"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "@/redux/store"
import ModalDialog from "@/components/modalDialog";

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
                <Provider store={store}>
                    <SessionProvider session={session}>
                        <Component {...pageProps} />
                        <ToastContainer />
                        <ModalDialog/>
                    </SessionProvider>
                </Provider>
            </StyleSheetManager>
        </>
    )
}