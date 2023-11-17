import "../home/home.css";
import banner from "../../pictures/banner.jpg";
import { useState } from "react";
import Cookies from "js-cookie";

// Components
import Register from "../../components/register/Register";
import Login from "../../components/login/Login";

const Home = ({
  token,
  setToken,
  loginModalState,
  registerModalState,
  setLoginModalState,
  setRegisterModalState,
}) => {
  return (
    <>
      <main>
        <section className="banner">
          <div className="back"></div>
          <img src={banner} alt="all marvel heroes epic" />
          <div className="front"></div>
        </section>
        <div className="container">
          <div className="text">
            <div>
              <div className="left"></div>
              <p>Welcome to ...</p>
              <div className="right"></div>
            </div>
            <h1>MARVEL Universe</h1>
          </div>
          <div className="identification">
            {token ? (
              <button
                className="connect"
                id="disconnect"
                onClick={() => {
                  Cookies.remove("token");
                  setToken();
                }}
              >
                Disconnect
              </button>
            ) : (
              <>
                <button
                  className="connect"
                  id="register"
                  onClick={() => {
                    setRegisterModalState(true);
                  }}
                >
                  Register
                </button>
                <button
                  className="connect"
                  id="login"
                  onClick={() => {
                    setLoginModalState(true);
                  }}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
        {/* ----------MODALE--------- */}
        {registerModalState && (
          <div className="modal">
            <Register
              setRegisterModalState={setRegisterModalState}
              setToken={setToken}
              setLoginModalState={setLoginModalState}
            />
          </div>
        )}
        {loginModalState && (
          <div className="modal">
            <Login
              setLoginModalState={setLoginModalState}
              setToken={setToken}
              setRegisterModalState={setRegisterModalState}
            />
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
