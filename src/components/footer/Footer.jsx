import CurrentTrack from '../currentTrack/CurrentTrack';
import PlayerControl from '../playerControl/PlayerControl';
import Volume from '../volumeControl/Volume';
import './footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <CurrentTrack />
      <PlayerControl />
      <Volume />
    </div>
  );
};

export default Footer;
