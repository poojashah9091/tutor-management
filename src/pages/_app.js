import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, } from "@clerk/nextjs";
import createEmotionCache from '../utils/createEmotionCache';
import theme from '../utils/theme.js';
import '../styles/globals.css';
import { useRouter } from "next/router";
import Layout from '@/components/Layout';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

const clientSideEmotionCache = createEmotionCache();

const publicPages = ["/signIn/[[...index]]", "/signUp/[[...index]]"];

const MyApp = ({ Component, pageProps, emotionCache = clientSideEmotionCache }) => {

  const { pathname } = useRouter();
  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ClerkProvider {...pageProps}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Head>
              <title>Team Up</title>
              <meta name='description' content='Mock application for tutor management' />
            </Head>
            <SignedIn>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SignedIn>
            <SignedOut>
              {publicPages.includes(pathname) ? (
                <>
                  <Component {...pageProps} />
                </>
              ) : (
                <RedirectToSignIn />
              )}
            </SignedOut>
          </ThemeProvider>
        </CacheProvider>
      </ClerkProvider>
      </LocalizationProvider>
    </>
  )
}

export default MyApp;