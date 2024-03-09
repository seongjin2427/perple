import qs from "qs";

const AUTHORIZE_URI = `https://accounts.google.com/o/oauth2/v2/auth`;

interface useGoogleProps {
  client_id: string | undefined;
}

const useGoogle = ({ client_id }: useGoogleProps) => {
  const redirect_uri = process.env.REACT_APP_BASE_URL;
  const loginQueryString = qs.stringify({
    client_id,
    redirect_uri,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/userinfo.profile",
  });

  return {
    loginUri: AUTHORIZE_URI + "?" + loginQueryString,
  };
};

export default useGoogle;
