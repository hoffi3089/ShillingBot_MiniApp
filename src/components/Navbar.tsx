import styled from "styled-components";
import { FaBell, FaCog, FaUser } from "react-icons/fa"; // Importing icons from react-icons
import React from "react";
import { useTabContext } from "../context/TabContext"; // Import your tab context

const NavbarComponent: React.FC = () => {
  const { activeTab, setActiveTab } = useTabContext(); // Access context values

  return (
    <Navbar>
      <div className="navbar-left">
        <img
          src="https://placehold.co/40x40"
          alt="Bot Logo"
          className="navbar-logo"
        />
        <div className="navbar-title">BotName</div>
      </div>
      <div className="navbar-right">
        <FaBell
          className={`navbar-icon ${activeTab === "Notifications" ? "active" : ""}`}
          title="Notifications"
          onClick={() => setActiveTab("Notifications")}
        />
        <FaCog
          className={`navbar-icon ${activeTab === "Settings" ? "active" : ""}`}
          title="Settings"
          onClick={() => setActiveTab("Settings")}
        />
        <FaUser
          className={`navbar-icon ${activeTab === "Profile" ? "active" : ""}`}
          title="Profile"
          onClick={() => setActiveTab("Profile")}
        />
      </div>
    </Navbar>
  );
};

const Navbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem;

  .navbar-left {
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      border-radius: 50%;
      width: 40px;
      height: 40px;
    }

    .navbar-title {
      letter-spacing: 0.09rem;
      font-weight: 600;
      font-size: 17px;
    }
  }

  .navbar-right {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    .navbar-icon {
      font-size: 20px;
      color: var(--icon-color);
      cursor: pointer;
      transition: color 0.5s ease-in-out;

      &:hover {
        color: var(--icon-hover-color);
      }

      &.active {
        color: var(--active-color); /* Add your active color here */
      }
    }
  }
`;

export default NavbarComponent;
