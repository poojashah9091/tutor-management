import Head from 'next/head';
import Header from '../components/layout/Header';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createEmotionCache from '../utils/createEmotionCache';
import theme from '../styles/theme.js';
import '../styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

const MyApp = ({ Component, pageProps, emotionCache = clientSideEmotionCache }) =>{
  return (
    <>
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Head>
          <title>Codevolution</title>
          <meta name='description' content='Awesome YouTube channel' />
        </Head>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
    </>
  )
}

export default MyApp;