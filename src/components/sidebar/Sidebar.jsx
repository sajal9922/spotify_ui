import { IoLibrary } from 'react-icons/io5';
import { MdHomeFilled, MdSearch } from 'react-icons/md';
import './sidebar.css';
import Playlist from '../playlist/Playlist';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="top-links">
        <div className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_White.png"
            alt="spotify logo"
          />
        </div>
        <ul>
          <li>
            <MdHomeFilled />
            <span>Home</span>
          </li>
          <li>
            <MdSearch />
            <span>Search</span>
          </li>
          <li>
            <IoLibrary />
            <span>Your librery</span>
          </li>
        </ul>
      </div>
      <Playlist />
    </div>
  );
};

export default Sidebar;
