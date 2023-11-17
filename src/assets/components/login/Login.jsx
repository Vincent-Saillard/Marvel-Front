import "../login/login.css";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Login = ({ setLoginModalState, setToken, setRegisterModalState }) => {
  // state to hide or show password
  const [showPassword, setShowPassword] = useState(false);
  // form states for each input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // state for error message to display
  const [errorMessage, setErrorMessage] = useState("");

  // function activating on form submission
  const handlesubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please fill-up every fields");
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "https://site--marvel-api--kyjktnxc458w.code.run/user/login",
            {
              email: email,
              password: password,
            }
          );
          const string = `Welcome back !`;
          alert(string);
          const token = response.data.token;
          setToken(token);
          Cookies.set("token", token, { expires: 15 });
          setErrorMessage("");
          setLoginModalState(false);
        } catch (error) {
          console.log(error);

          setErrorMessage("Wrong combination of email / password");
        }
      };
      fetchData();
    }
  };

  return (
    <section className="login">
      <form onSubmit={handlesubmit}>
        <div
          className="cross"
          onClick={() => {
            setLoginModalState(false);
          }}
        >
          X
        </div>
        <div className="titleBanner">
          <div className="left"></div>
          <div className="title">Login</div>
          <div className="right"></div>
        </div>
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
        <input type="submit" className="submit" value="Welcome back !" />
        <p
          className="already"
          onClick={() => {
            setRegisterModalState(true);
            setLoginModalState(false);
          }}
        >
          Not already a member ?
        </p>
      </form>
    </section>
  );
};

export default Login;
