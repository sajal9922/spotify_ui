import { useEffect, useState } from 'react';
import './currentTrack.css';
import axios from 'axios';
import useAccessTokenStore from '../../store/accessTokenStore';
import usePlaylistStore from '../../store/playlistStore';

const CurrentTrack = () => {
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const currentlyPlaying = usePlaylistStore((state) => state.currentlyPlaying);
  const setCurrentlyPlaying = usePlaylistStore(
    (state) => state.setCurrentlyPlaying
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentTrack = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'https://api.spotify.com/v1/me/player/currently-playing',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data && response.data.item) {
          const { item } = response.data;
          const track = {
            name: item.name,
            artists: item.artists.map((artist) => artist.name).join(', '),
            image: item.album.images[0].url,
            duration: item.duration_ms,
          };
          setCurrentlyPlaying(track);
          console.log('Currently playing:', track);
        } else {
          setCurrentlyPlaying(null);
        }
      } catch (error) {
        console.error('Error fetching current track:', error);
        setCurrentlyPlaying(null);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      getCurrentTrack();
    }
  }, [accessToken, setCurrentlyPlaying]);

  if (loading) {
    return <div className="current-track-container">Loading...</div>;
  }

  return <div className="current-track-container">CurrentTrack</div>;
};

export default CurrentTrack;
