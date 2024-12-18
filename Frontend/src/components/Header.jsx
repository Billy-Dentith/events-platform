import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { FaCircleUser } from "react-icons/fa6";
import "./Header.css"
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { role } = useContext(AuthContext); 

  const links = [
    { id: 1, title: "Home", url: "/" },
    { id: 2, title: "Find Events", url: "/events" },
    { id: 3, title: "My Events", url: "/my-events" },
  ];

  return (
    <header className="header">
      {/* LOGO */}
      <div className="header-logo">
        <Link to="/">
          <img src="/assets/logo.png" alt="Logo" />
        </Link>
      </div>
      {/* NAV LINKS */}
      <nav className={`header-nav ${isMobileMenuOpen ? "open" : ""}`}>
        <ul>
          {links.map((link) => (
            <li key={link.id}>
              <Link className="link" to={link.url}>
                {link.title}
              </Link>
            </li>
          ))}
          {role === "staff" && (
            <li key="staff">
              <Link className="link" to="/staff-dashboard">
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </nav>
      {/* ACCOUNT ICON */}
      <div className="header-icons">
        <Link
          to="/account"
          className="icon"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FaCircleUser />
        </Link>
      </div>
      {/* MOBILE MENU */}
      <div className="mobile-menu">
        <MobileMenu
          links={links}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </div>
    </header>
  );
};

export default Header;