// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
// import axios from 'axios';


type Data = {
  name: string;
};

export default function handler(
  // req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}



// type PostTokenData = {
//   access_token: string;
//   expires_in: number;
//   token_type: 'bearer';
// };

// export const postToken = async () => {
//   const existsToken = CookieGetToken();
//   if (!existsToken) {
//     await axios
//       .post('https://id.twitch.tv/oauth2/token', {
//         client_id: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
//         client_secret: process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET,
//         grant_type: 'client_credentials',
//       })
//       .then((res) => {
//         const data = res.data as PostTokenData;
//         CookieSetToken(data.access_token, data.expires_in);
//       })
//       .catch((error: any) => {
//         console.log('error', error.response.data);
//         alert('현재 이용을 할 수 없는 서비스 입니다. 관리자에게 문의하세요');
//       });
//   } else {
//     return existsToken;
//   }
// };
