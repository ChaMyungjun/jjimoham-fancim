import { NextApiResponse, NextApiRequest } from 'next';

import * as webPush from 'web-push';

//api
// import client from 'api/GRAPHQL';

//server

export default function register(req: NextApiRequest, res: NextApiResponse) {
  // const tokenList: webPush.PushSubscription[] = [];

  const handleRegisterServicewoker = async () => {
    // const notificationData = req.body as {
    //   endpoint: string;
    //   expirationTime: string;
    //   keys: { auth: string; p256dh: string };
    // };

    // await client.query({
    //   query: gql`
    //     mutation {
    //       registerNotification(notification: {
    //         endpoint: ${notificationData.endpoint},
    //         expirationTime: ${notificationData.expirationTime},
    //         p256dh: ${notificationData.keys.p256dh},
    //         auth: ${notificationData.keys.auth}
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

    // tokenList.push(req.body);
    // res.send(tokenList);
  };

  const handleNoticeSerivceWorker = async () => {
    if (!req.query['tokenList[]']) return '';

    const token = JSON.parse(
      req.query['tokenList[]'].toString() ?? 'null',
    ) as webPush.PushSubscription | null;

    const options = {
      TTL: 24 * 60 * 60,
      vapidDetails: {
        subject:
          process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://jjimoham.vercel.app',
        publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? '',
        privateKey: process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY ?? '',
      },
    };

    // const payload = JSON.stringify({
    //   title: '찌모가 왔어요',
    //   body: `찌모는 방송중`,
    //   icon: `${process.env.NEXT_PUBLIC_SERVER_URL}/og/OG.png`,
    //   tag: 'default tag',
    //   ...req.query,
    // });

    const payload = '찌모가 왔어요';

    try {
      if (token !== null)
        await webPush.sendNotification(token, payload, options);
      // await Promise.all(() => );
    } catch (error) {
      console.error('service wokrer notice send error', error);
    }

    res.send('success');
  };

  switch (req.method) {
    case 'GET':
      handleNoticeSerivceWorker();
      break;
    case 'POST':
      handleRegisterServicewoker();
  }
}
