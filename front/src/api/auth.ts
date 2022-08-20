export const getGoogleAuth = async () => {
  const OAUTH2_SCOPES = 'https://www.googleapis.com/auth/youtube';

  async function start() {
    const gapi = await window.gapi;

    const initialized = async () => {
      await gapi.client.init({
        apiKey: process.env.REACT_APP_YOUTUBE_API_KEY,
      });
    };

    gapi.load('client', initialized);
  }

  start();
};
