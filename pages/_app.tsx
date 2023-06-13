import Head from "next/head";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>𝓁𝒾𝓋𝒾𝓃𝑔 𝒹𝒾𝑔𝒾𝓉𝒶𝓁 𝒶𝓇𝒸𝒽𝒾𝓋𝑒𝓈</title>
        <meta
          name="description"
          content="An archive of the deleted websites on Yahoo! Geocities in the context of modern web frameworks—capturing the tension between a lost past and a distant future. "
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
        <link rel="icon" href="/favicon/favicon.ico" />

        <meta
          property="og:url"
          content="https://living-digital-archives.bhris.digital/"
        />
        <meta property="og:title" content="𝓁𝒾𝓋𝒾𝓃𝑔 𝒹𝒾𝑔𝒾𝓉𝒶𝓁 𝒶𝓇𝒸𝒽𝒾𝓋𝑒𝓈" />
        <meta
          property="og:description"
          content="An archive of the deleted websites on Yahoo! Geocities in the context of modern web frameworks—capturing the tension between a lost past and a distant future."
        />
        <meta
          property="og:image"
          content="https://living-digital-archives.vercel.app/og_image.jpg"
        />
        <meta property="og:site_name" content="bhris.digital/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@001090100i" />
        <meta name="twitter:creator" content="@001090100i" />
      </Head>

      <Analytics />
      <Component {...pageProps} />
    </>
  );
}
