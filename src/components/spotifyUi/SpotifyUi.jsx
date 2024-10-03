import axios from 'axios';
import useAccessTokenStore from '../../store/accessTokenStore';
import Body from '../body/Body';
import Footer from '../footer/footer';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import './spotifyUi.css';
import { useEffect, useState, useRef } from 'react';
import useUserInfoStore from '../../store/userInfoStore';
const SpotifyUi = () => {
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);
  const userInfo = useUserInfoStore((state) => state.userInfo);

  const [loading, setLoading] = useState(true); // Add loading state
  const bodyRef = useRef();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);

  const bodyScroll = () => {
    // ternary operator
    bodyRef.current.scrollTop > 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop > 286
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const response = await axios.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        const { id, display_name, email, images } = response.data;

        setUserInfo({ id, display_name, email, images });
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    if (accessToken) {
      getUserInfo();
    }
  }, [setUserInfo, accessToken]);

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator while fetching data
  }

  return (
    <div className="spotify-container">
      <div className="spotify-body">
        <Sidebar />
        <div className="body" ref={bodyRef} onScroll={bodyScroll}>
          <Navbar navBackground={navBackground} />
          <div className="body-content">
            <Body headerBackground={headerBackground} />
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
