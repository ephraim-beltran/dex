import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/" onClick={toggleMenu}>
            <h1 id="logo">Pokedex</h1>
          </Link>
        </li>
        <li className="icon">
          <Link to="javascript:void(0);" onClick={toggleMenu}>
            <i class="fa fa-bars"></i>
          </Link>
        </li>
        {openMenu && (
          <>
            <li className="link">
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li className="link">
              <Link to="/search" onClick={toggleMenu}>
                Search
              </Link>
            </li>
            <li className="link">
              <Link to="/type-calculator" onClick={toggleMenu}>
                Type Calculator
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
