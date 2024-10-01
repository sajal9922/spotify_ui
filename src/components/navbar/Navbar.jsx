import useUserInfoStore from '../../store/userInfoStore';
import './Navbar.css';
import { FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const userInfo = useUserInfoStore((state) => state.userInfo);
  return (
    <div className="nav-bar">
      <div className="search-bar">
        <FaSearch />
        <input type="text" placeholder="Search for songs, artists, albums" />
      </div>
      <div className="avatar">
        <a href="#">
          <img src={userInfo.images[1].url} alt={userInfo.display_name} />
          <span>{userInfo.display_name}</span>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
