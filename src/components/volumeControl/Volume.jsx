import './Volume.css';
import useAccessTokenStore from '../../store/accessTokenStore';
import axios from 'axios';

const Volume = () => {
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const setVolume = async (e) => {
    await axios.put(
      'https://api.spotify.com/v1/me/player/volume',
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    );
  };

  return (
    <div className="volume-container">
      <input
        type="range"
        min="0"
        max="100"
        className="volume-slider"
        onMouseUp={(e) => setVolume(e)}
      />
    </div>
  );
};

export default Volume;
