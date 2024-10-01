import axios from 'axios';
import useAccessTokenStore from '../../store/accessTokenStore';
import Body from '../body/Body';
import Footer from '../footer/footer';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import './spotifyUi.css';
import { useEffect } from 'react';
import useUserInfoStore from '../../store/userInfoStore';
const SpotifyUi = () => {
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const { id, display_name, email, images } = response.data;
      setUserInfo({ id, display_name, email, images });
    };
    getUserInfo();
  }, [setUserInfo]);

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
