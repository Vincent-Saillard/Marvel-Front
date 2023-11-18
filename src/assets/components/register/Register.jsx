import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import "../register/register.css";

const Register = ({ setRegisterModalState, setToken, setLoginModalState }) => {
  // state to hide or show password
  const [showPassword, setShowPassword] = useState(false);
  // form states for each input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // state for error message to display
  const [errorMessage, setErrorMessage] = useState("");

  // function activating on form submission
  const handlesubmit = (event) => {
    event.preventDefault();

    if (!username || !email || !password) {
      setErrorMessage("Please fill-up every fields");
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "https://site--marvel-api--kyjktnxc458w.code.run/user/signup",
            {
              username: username,
              email: email,
              password: password,
            }
          );
          const string = `Welcome on board ${username} !`;
          alert(string);
          const token = response.data.token;
          setToken(token);
          Cookies.set("token", token, { expires: 15 });
          setErrorMessage("");
          setRegisterModalState(false);
        } catch (error) {
          console.log(error);
          if (
            error.response.data.message ===
            "This mail already exists, ask user to connect"
          ) {
            setErrorMessage(
              "This Email already exists, please Login to your account"
            );
          }
        }
      };
      fetchData();
    }
  };

  return (
    <section className="register">
      <form onSubmit={handlesubmit}>
        <div
          className="cross"
          onClick={() => {
            setRegisterModalState(false);
          }}
        >
          X
        </div>
        <div className="titleBanner">
          <div className="left"></div>
          <div className="title">Register</div>
          <div className="right"></div>
        </div>
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => {
            const value = event.target.value;
            setUsername(value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => {
            const value = event.target.value;
            setEmail(value);
          }}
        />
        <div className="pass">
          <div
            className="eye"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            👁
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(event) => {
              const value = event.target.value;
              setPassword(value);
            }}
          />
        </div>
        <p className="errormessage">{errorMessage}</p>
        <input type="submit" className="submit" value="Join Heroes !" />
        <p
          className="already"
          onClick={() => {
            setLoginModalState(true);
            setRegisterModalState(false);
          }}
        >
          Already a member ?
        </p>
      </form>
    </section>
  );
};

export default Register;
