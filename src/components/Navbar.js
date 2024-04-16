import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../App.css";
import { IconContext } from "react-icons";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetState } from "../store/actions";

function Navbar({ open }) {
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const showSidebar = () => setSidebar(!sidebar);
  const userName = useSelector(state => state.user.username);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    dispatch(resetState());
    navigate("/");
  };

  return (
    <>
      {open && (
        <IconContext.Provider value={{ color: "undefined" }}>
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <div className="user-icon">
            <span className="user-name">{userName ? userName : ''}</span>
              <FaIcons.FaUser />
            </div>
            <div className="logout-icon" onClick={handleLogout}>
              <AiIcons.AiOutlineLogout />
            </div>
            <style>{`
              .user-icon {
                margin-left: auto;
                font-size: xx-large;
                margin-right: 1rem;
              }
              .logout-icon {
                cursor: pointer;
                font-size: 1.5rem;
                margin-right: 2.5rem;
              }
              .user-name {
                margin-right: 10px;
                font-size: large;
              }
            `}</style>
          </div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      )}
    </>
  );
}

export default Navbar;
