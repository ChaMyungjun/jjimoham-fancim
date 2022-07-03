import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
// import axios from 'axios';
import { gql } from 'apollo-boost';

// api
import { postToken } from 'api/POST';

//graphql
import client from 'api/GRAPHQL';

// components
import { FadeInCompo } from 'components/Fade/FadeIn';

// style
import { theme } from 'Layout/theme';
import GlobalStyle from '../styles/globals.css';

// utils
// import { CookieSetServiceWorkerToken } from 'utils/Storage';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  const queryClient = new QueryClient();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);

    postToken();

    Notification.requestPermission().then((status) => {
      if (status === 'denied') {
        console.log('Notification Denied');
      } else {
        if (navigator.serviceWorker) {
          navigator.serviceWorker
            .register('/serviceWorker/serviceworker.js')
            .then((registration) => {
              const subscribeOptions = {
                userVisibleOnly: true,
                // push subscription이 유저에게 항상 보이는지 여부. 알림을 숨기는 등 작업이 들어가지는에 대한 여부인데, 크롬에서는 true 밖에 지원안한다.
                // https://developers.google.com/web/fundamentals/push-notifications/subscribing-a-user
                applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
              };

              navigator.serviceWorker.ready;

              return registration.pushManager?.subscribe(subscribeOptions);
            })
            .then(async (pushSubscription) => {
              console.log(pushSubscription.toJSON())    


              // await client.query({
              //   query: gql`
              //     mutation {
              //       registerNotification(notification: {
              //         ${pushSubscription}
              //       }) {
              //         id
              //         endpoint
              //         expirationTime
              //         p256dh
              //         auth
              //       }
              //     }
              //   `,
              // });
              // await axios
              //   .post('/api/serviceworker/', pushSubscription)
              //   .then((res) => {
              //     CookieSetServiceWorkerToken(JSON.stringify(res.data));
              //   })
              //   .catch((error) => {
              //     console.error('service worker reigster error', error);
              //   });
            })
            .catch((err) => {
              console.error('error', err);
            });
        }
      }
    });

    console.log('made by tkendi');
  }, []);

  return loading ? (
    <></>
  ) : (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
          />
        </Head>
        <GlobalStyle />
        <FadeInCompo lazy={!loading}>
          <Component {...pageProps} />
        </FadeInCompo>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
