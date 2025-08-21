import React from "react";
import FaceIcon from "@mui/icons-material/Face";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Link } from "react-router-dom";

import logo from "../assets/SeenIt-nobg.png";

const Navbar: React.FC = () => {
  return (
    <nav className="px-4 py-3">
      <div className="container mx-auto flex items-center justify-center sm:justify-between max-w-5xl">
        <Link to="/">
          <img src={logo} alt="SeenIt logo" className="h-15" />
        </Link>
        <ul className="space-x-6 hidden sm:flex">
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
