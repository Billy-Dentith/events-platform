import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaAlignJustify, FaXmark } from "react-icons/fa6";
import { IconContext } from "react-icons/lib";
import { AuthContext } from "../context/AuthContext";

const MobileMenu = ({ links, isMobileMenuOpen, setIsMobileMenuOpen }) => {

  const { role } = useContext(AuthContext);

  return (
    <div>
      {isMobileMenuOpen ? (
        <button onClick={() => setIsMobileMenuOpen(false)}>
          <IconContext.Provider value={{ className: "react-icons" }}>
            <FaXmark />
          </IconContext.Provider>
        </button>
      ) : (
        <button onClick={() => setIsMobileMenuOpen(true)}>
          <IconContext.Provider value={{ className: "react-icons" }}>
            <FaAlignJustify />
          </IconContext.Provider>
        </button>
      )}
      {isMobileMenuOpen && (
        <div className="mobile-menu-nav">
          <ul>
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  className="link"
                  to={link.url}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </Link>
              </li>
            ))}
            {role === "staff" && (
              <li key="staff">
                <Link
                  className="link"
                  to="/staff-dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Staff Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;