import "../header/header.css";
import logo from "../../pictures/logo.png";
import star from "../../pictures/star.png";
import glass from "../../pictures/glass.png";
import burger from "../../pictures/burger.png";
import cross from "../../pictures/cross.png";

import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = ({ setSearchName, token, setRegisterModalState }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [displayBurger, setDisplayBurger] = useState(false);

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

            {displayBurger ? (
              <div
                className="burgermenu"
                onClick={() => {
                  setDisplayBurger(false);
                }}
              >
                <img src={cross} alt="burger menu button" />
              </div>
            ) : (
              <div
                className="burgermenu"
                onClick={() => {
                  setDisplayBurger(true);
                }}
              >
                <img src={burger} alt="burger menu button" />
              </div>
            )}
          </div>

          {displayBurger ? (
            <>
              <div className={`linetwo ${displayBurger ? null : "none"}`}>
                <div className="navBurger">
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
                  <Link
                    to="/favs"
                    className={`link ${
                      location.pathname === "/favs" && "active"
                    }`}
                  >
                    Fav's
                  </Link>
                  <div className="border"></div>
                </div>
              </div>

              <div
                className={`linethree ${
                  location.pathname === "/characters" ||
                  location.pathname === "/comics"
                    ? null
                    : "none"
                }`}
              >
                {/* On Comics or Characters pages search input is visible */}
                <div
                  className={`searchBurger ${
                    location.pathname === "/characters" ||
                    location.pathname === "/comics"
                      ? null
                      : "none"
                  }`}
                >
                  <img
                    src={glass}
                    alt="white magnifying glass"
                    className="glass"
                  />
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
              </div>
            </>
          ) : null}
        </div>
      </header>
    </>
  );
};

export default Header;
