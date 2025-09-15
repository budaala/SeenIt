import { Link } from "react-router-dom";
import logo from "../../assets/LogoWithName.png";
import backdrop from "../../assets/backdrop.png";

const LogIn: React.FC = () => {
  return (
    <>
      <div
        className="loginBackdrop"
        style={{
          backgroundImage: `url(${backdrop})`,
        }}
      >
        <div className="login-overlay pointer-events-none"></div>
      </div>
      <div className="logInContainer">
        <div className="content">
          <div className="header">
            <img src={logo} className="logo" />
            <h1 className="title">Welcome Back!</h1>
            <p className="signUpText">
              Don't have an account yet?{" "}
              <Link to="/register" className="signUpLink">
                Sign Up
              </Link>{" "}
            </p>
          </div>
          <div className="login">
            <form className="form">
              <div className="form-group">
                <input
                  name="username"
                  type="text"
                  className="form-control"
                  placeholder="Username or Email"
                ></input>
              </div>
              <div className="form-group">
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                ></input>
              </div>
              <button type="submit" className="submitButton">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
