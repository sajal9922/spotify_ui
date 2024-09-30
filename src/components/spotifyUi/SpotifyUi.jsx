import Body from '../body/Body';
import Footer from '../footer/footer';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import './spotifyUi.css';
const SpotifyUi = () => {
  return (
    <div className="spotify-container">
      <div className="spotify-body">
        <Sidebar />
        <div className="body">
          <Navbar />
          <div className="body-content">
            <Body />
          </div>
        </div>
      </div>
      <div className="spotify-footer">
        <Footer />
      </div>
    </div>
  );
};

export default SpotifyUi;
