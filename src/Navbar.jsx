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
          <Link to="/" onClick={() => setOpenMenu(false)}>
            <h1 id="logo">Pokedex</h1>
          </Link>
        </li>
        <li className="icon">
          <button onClick={toggleMenu}>
            <i className="fa fa-bars"></i>
          </button>
        </li>
        {openMenu && (
          <>
            <li className="link">
              <Link to="/" onClick={() => setOpenMenu(false)}>
                Home
              </Link>
            </li>
            <li className="link">
              <Link to="/search" onClick={() => setOpenMenu(false)}>
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
