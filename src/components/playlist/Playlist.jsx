import axios from 'axios';
import useAccessTokenStore from '../../store/accessTokenStore';
import usePlaylistStore from '../../store/playlistStore';
import './Playlist.css';
import { useEffect } from 'react';
const Playlist = () => {
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const setPlaylists = usePlaylistStore((state) => state.setPlaylists);
  const playlists = usePlaylistStore((state) => state.playlists);
  useEffect(() => {
    const getPlaylist = async () => {
      const response = await axios.get(
        'https://api.spotify.com/v1/me/playlists',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const { items } = response.data;
      const playlist = items.map(({ id, name, images }) => {
        return { id, name, images };
      });
      setPlaylists(playlist);
    };
    getPlaylist();
  }, [accessToken, setPlaylists]);
  return (
    <div className="playlist-container">
      <h2>Your Playlists</h2>
      <div className="playlist">
        {playlists.map((playlist) => {
          return (
            <div key={playlist.id} className="playlist-item">
              <img src={playlist.images[0].url} alt={playlist.name} />
              <p>{playlist.name}</p>
            </div>
          );
        })}
        {playlists.map((playlist) => {
          return (
            <div key={playlist.id} className="playlist-item">
              <img src={playlist.images[0].url} alt={playlist.name} />
              <p>{playlist.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Playlist;
