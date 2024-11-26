import React from "react";
import { Link } from "react-router-dom";
import { FaAlignJustify, FaXmark } from "react-icons/fa6";
import { IconContext } from "react-icons/lib";

const MobileMenu = ({ links, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <div>
      {isMobileMenuOpen ? (
        <button onClick={() => setIsMobileMenuOpen(false)}>
            <IconContext.Provider value={{ className: 'react-icons' }}>
                <FaXmark />
            </IconContext.Provider>
        </button>
      ) : (
        <button onClick={() => setIsMobileMenuOpen(true)}>
            <IconContext.Provider value={{ className: 'react-icons' }}>
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
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;