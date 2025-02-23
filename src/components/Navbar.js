import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ toggleSidebar, sidebarOpen, children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">RedditApp</h1>
        {children}
        {/* Se sidebarOpen è true, mostra X (FaTimes), altrimenti hamburger (FaBars) */}
        {sidebarOpen ? (
          <FaTimes className="hamburger-icon" onClick={toggleSidebar} />
        ) : (
          <FaBars className="hamburger-icon" onClick={toggleSidebar} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
