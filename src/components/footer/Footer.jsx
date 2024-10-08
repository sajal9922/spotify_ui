import CurrentTrack from '../currentTrack/CurrentTrack';
import PlayerControl from '../playerControl/PlayerControl';
import './footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <CurrentTrack />
      <PlayerControl />
    </div>
  );
};

export default Footer;
