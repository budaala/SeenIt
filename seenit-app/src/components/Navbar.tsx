import React from "react";
import FaceIcon from "@mui/icons-material/Face";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Link } from "react-router-dom";

import logo from "../assets/LogoWithName.png";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="mainLogo">
          <img src={logo} alt="SeenIt logo" className="h-10 w-auto" />
        </Link>
        <ul className="sm:space-x-6 hidden sm:flex">
          <li>
            <Link to="/top-rated" className="link">
              <EmojiEventsIcon />
            </Link>
          </li>
          <li>
            <Link to="/my-list" className="link">
              <FormatListBulletedIcon />
            </Link>
          </li>
          <li>
            <Link to="/profile" className="link">
              <FaceIcon />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
