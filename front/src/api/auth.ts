import instance from './instance';
import qs from 'qs';

const getGoogleAuth = async () => {
  const query = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  const code = query.code;

  const { data } = await instance.post(
    'https://www.googleapis.com/oauth2/v4/token',
    {
      code,
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECURE_PASSWORD,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:3000',
    },
  );

  console.log(data);
};

export default getGoogleAuth;
