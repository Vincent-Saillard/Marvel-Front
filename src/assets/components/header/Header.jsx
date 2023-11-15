import "../header/header.css";
import logo from "../../pictures/logo.png";
import star from "../../pictures/star.png";
import { useLocation, Link, useNavigate } from "react-router-dom";

const Header = ({ setSearchName }) => {
  const location = useLocation();

  return (
    <>
      <header>
        <div className="container">
          <div className="lineOne">
            <Link to="/">
              <img src={logo} alt="Marvel logo white on red" className="logo" />
            </Link>

            {/* On Comics or Characters pages search input is visible */}

            <input
              type="search"
              className={`searchBar ${
                location.pathname === "/characters" ||
                location.pathname === "/comics"
                  ? null
                  : "hidden"
              }`}
              onChange={(event) => {
                const value = event.target.value;
                setSearchName(value);
              }}
            />

            <nav>
              <Link to="/characters" className="link">
                Heroes
              </Link>
              <Link to="/comics" className="link">
                Comics
              </Link>
            </nav>
            <Link to="/favs">
              <img src={star} alt="captain america's star" className="star" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
