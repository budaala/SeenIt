import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/LogoWithName2.png";
import backdrop from "../../assets/backdrop.png";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { userService } from "../../services/userService";
import toast from "react-hot-toast";
import { useUserStore } from "../../store/userStore";

interface IFormInput {
  usernameOrEmail: string;
  password: string;
}

const LogIn: React.FC = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const setUser = useUserStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const response = await userService.logIn(
      data.usernameOrEmail,
      data.password
    );

    if (response.success) {
      setUser(response.user.username);
      toast.success("Logged in successfully!");
      navigate("/");
    } else {
      setApiError(response.message);
      toast.error("Logging in failed!");
    }
  };

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
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <input
                  type="text"
                  {...register("usernameOrEmail", { required: true })}
                  className="form-control"
                  placeholder="Username or Email"
                ></input>
                <p className="error-message">
                  {errors.usernameOrEmail?.message}
                </p>
              </div>
              <div className="form-group">
                <input
                  {...register("password", { required: true })}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                ></input>
                <p className="error-message">{errors.password?.message}</p>
              </div>
              <p className="api-error-message">{apiError}</p>

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
