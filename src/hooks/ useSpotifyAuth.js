import { useEffect } from 'react';
import useAccessTokenStore from '../store/accessTokenStore';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const useSpotifyAuth = () => {
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  const setExpiresIn = useAccessTokenStore((state) => state.setExpiresIn);
  const setError = useAccessTokenStore((state) => state.setError);
  const setLoading = useAccessTokenStore((state) => state.setLoading);

  useEffect(() => {
    const fetchAccessToken = async () => {
      setLoading(true); // Set loading to true at the start of the fetch
      try {
        const authParams = new URLSearchParams();
        authParams.append('grant_type', 'client_credentials');

        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
          },
          body: authParams.toString(),
        });

        if (!response.ok) {
          throw new Error('Failed to get access token');
        }

        const data = await response.json();

        setAccessToken(data.access_token); // Store token in Zustand
        setExpiresIn(data.expires_in); // Store expires_in in Zustand
      } catch (err) {
        setError(err.message); // Store error in Zustand
      } finally {
        setLoading(false); // Set loading to false in both success and error cases
      }
    };

    fetchAccessToken();
  }, [setAccessToken, setExpiresIn, setError, setLoading]);
};

export default useSpotifyAuth;
