import "../../styles/main.css"
import 'bootstrap/dist/css/bootstrap.css';
import Head from "next/head";
import { SessionProvider } from "next-auth/react"

export default function MyApp({ Component, pageProps : { session, ...pageProps }}) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </>
    )
}