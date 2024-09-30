import { useEffect, useState } from 'react';
import Login from './components/login/Login';
import SpotifyUi from './components/spotifyUi/SpotifyUi';
import useAccessTokenStore from './store/accessTokenStore';

const App = () => {
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  const setExpiresIn = useAccessTokenStore((state) => state.setExpiresIn);
  const setTokenType = useAccessTokenStore((state) => state.setTokenType);
  const setState = useAccessTokenStore((state) => state.setState);
  const setError = useAccessTokenStore((state) => state.setError);
  const state = useAccessTokenStore((state) => state.state);
  const tokenType = useAccessTokenStore((state) => state.tokenType);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const expiresIn = useAccessTokenStore((state) => state.expiresIn);
  const error = useAccessTokenStore((state) => state.error);
  useEffect(() => {
    // Extract the access token from the URL fragment (hash)
    const hash = window.location.hash.substring(1).split('&');
    // console.log('Hash:', hash);
    const hashObject = hash.reduce((acc, current) => {
      const [key, value] = current.split('=');
      acc[key] = value;
      return acc;
    }, {});
    if (hashObject.error) {
      setError(hashObject.error);
    } else {
      console.log('hashObject::', hashObject);
      setAccessToken(hashObject.access_token);
      setExpiresIn(hashObject.expires_in);
      setTokenType(hashObject.token_type);
      setState(hashObject.state);
    }
  }, []);

  return <>{accessToken ? <SpotifyUi /> : <Login />}</>;
};

export default App;
