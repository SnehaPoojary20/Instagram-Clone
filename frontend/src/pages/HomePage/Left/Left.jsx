import './Left.css';
import { IoMdHome } from "react-icons/io";
import { FaSearch, FaRegCompass, FaRegHeart } from "react-icons/fa";
import { ImFilm } from "react-icons/im";
import { LuMessageCirclePlus } from "react-icons/lu";
import { FaRegSquarePlus } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { Link } from 'react-router-dom'; 

const LeftSide = () => {
  return (
    <div className="left">
      <img src="/image2.png" alt="Phone Frame" className="image2" />
      <div className="Sidebar">
        <div className="features">
          <IoMdHome size={35} color="white" />
          <div className="feature">Home</div>
        </div>
        <div className="features">
          <FaSearch size={30} color="white" />
          <div className="feature">Search</div>
        </div>
        <div className="features">
          <FaRegCompass size={30} color="white" />
          <div className="feature">Explore</div>
        </div>
        <div className="features">
          <ImFilm size={30} color="white" />
          <div className="feature">Reels</div>
        </div>
        <div className="features">
          <LuMessageCirclePlus size={30} color="white" />
          <div className="feature">Messages</div>
        </div>
        <div className="features">
          <FaRegHeart size={30} color="white" />
          <div className="feature">Notifications</div>
        </div>
        <div className="features">
          <FaRegSquarePlus size={30} color="white" />
          <div className="feature">Create</div>
        </div>

        {/* Profile link */}
        <Link to="/profile" className="features link-style">
          <RiCheckboxBlankCircleLine size={30} color="white" />
          <div className="feature">Profile</div>
        </Link>

        <div className="features">
          <MdMenu size={30} color="white" />
          <div className="feature">More</div>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;

