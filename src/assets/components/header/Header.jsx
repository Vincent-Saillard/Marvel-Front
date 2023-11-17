import "../header/header.css";
import logo from "../../pictures/logo.png";
import star from "../../pictures/star.png";
import glass from "../../pictures/glass.png";
import { useLocation, Link, useNavigate } from "react-router-dom";

const Header = ({ setSearchName, token, setRegisterModalState }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className="container">
          <div className="lineOne">
            <Link to="/">
              <img src={logo} alt="Marvel logo white on red" className="logo" />
            </Link>

            {/* On Comics or Characters pages search input is visible */}
            <div
              className={`search ${
                location.pathname === "/characters" ||
                location.pathname === "/comics"
                  ? null
                  : "hidden"
              }`}
            >
              <img src={glass} alt="white magnifying glass" className="glass" />
              <input
                type="search"
                id="search"
                className="searchBar"
                onChange={(event) => {
                  const value = event.target.value;
                  setSearchName(value);
                }}
              />
            </div>

            <nav>
              <div className="border"></div>
              <Link
                to="/characters"
                className={`link ${
                  location.pathname === "/characters" && "active"
                }`}
              >
                Heroes
              </Link>
              <div className="border"></div>
              <Link
                to="/comics"
                className={`link ${
                  location.pathname === "/comics" && "active"
                }`}
              >
                Comics
              </Link>
              <div className="border"></div>
            </nav>
            <div
              className="toFavs"
              onClick={() => {
                if (token) {
                  navigate("/favs");
                } else {
                  setRegisterModalState(true);
                  navigate("/");
                }
              }}
            >
              <img src={star} alt="captain america's star" className="star" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
