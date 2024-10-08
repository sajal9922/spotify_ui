import './PlayerControl.css';
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from 'react-icons/bs';
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg';
import { FiRepeat } from 'react-icons/fi';
import usePlayListStore from '../../store/playlistStore';

const PlayerControl = () => {
  const setPlayerState = usePlayListStore((state) => state.setPlayerState);
  const playerState = usePlayListStore((state) => state.playerState);
  return (
    <div className="player-control-container">
      <FiRepeat className="player-control-icon" />
      <CgPlayTrackPrev className="player-control-icon prev" />
      {playerState ? (
        <BsFillPauseCircleFill
          className="player-control-icon pause"
          onClick={() => setPlayerState(false)}
        />
      ) : (
        <BsFillPlayCircleFill
          className="player-control-icon play"
          onClick={() => setPlayerState(true)}
        />
      )}
      <CgPlayTrackNext className="player-control-icon next" />
      <BsShuffle className="player-control-icon" />
    </div>
  );
};

export default PlayerControl;
