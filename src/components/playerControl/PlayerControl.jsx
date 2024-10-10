import './PlayerControl.css';
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from 'react-icons/bs';
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg';
import { FiRepeat } from 'react-icons/fi';
import usePlayListStore from '../../store/playlistStore';
import useAccessTokenStore from '../../store/accessTokenStore';
import axios from 'axios';

const PlayerControl = () => {
  const setPlayerState = usePlayListStore((state) => state.setPlayerState);
  const playerState = usePlayListStore((state) => state.playerState);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const setCurrentlyPlaying = usePlayListStore(
    (state) => state.setCurrentlyPlaying
  );
  const currentlyPlaying = usePlayListStore((state) => state.currentlyPlaying);

  const changeTrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Adding a small delay to ensure the track change is processed
    await new Promise((resolve) => setTimeout(resolve, 500));

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
      // console.log('Currently playing:', track);
    } else {
      setCurrentlyPlaying(null);
    }
  };

  const playPause = async () => {
    const state = playerState ? 'pause' : 'play';
    await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    setPlayerState(!playerState);
  };

  return (
    <div className="player-control-container">
      <FiRepeat className="player-control-icon" />
      <CgPlayTrackPrev
        className="player-control-icon prev"
        onClick={() => changeTrack('previous')}
      />
      {playerState ? (
        <BsFillPauseCircleFill
          className="player-control-icon pause"
          onClick={() => playPause()}
        />
      ) : (
        <BsFillPlayCircleFill
          className="player-control-icon play"
          onClick={() => playPause()}
        />
      )}
      <CgPlayTrackNext
        className="player-control-icon next"
        onClick={() => changeTrack('next')}
      />
      <BsShuffle className="player-control-icon" />
    </div>
  );
};

export default PlayerControl;
