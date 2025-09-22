import { useForm, type SubmitHandler } from "react-hook-form";
import backdrop from "../../assets/backdrop2.png";
import logo from "../../assets/LogoWithName2.png";
import { Link, useNavigate } from "react-router-dom";
import { userService } from "../../services/userService";
import { useState } from "react";
import toast from "react-hot-toast";

interface IFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  // isAdmin: { type: Boolean; default: false };
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const password = watch("password");

  const [apiError, setApiError] = useState("");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const response = await userService.register(
      data.username,
      data.email,
      data.password,
      false
    );

    if (response.success) {
      toast.success("Account created! You can now log in.");
      navigate("/login");
    } else {
      setApiError(response.message);
      toast.error("Registration failed!");
    }
  };

  // Walidacja pól formularza
  const usernameValidation = {
    required: "Username is required.",
    minLength: {
      value: 3,
      message: "Username must be at least 3 characters long.",
    },
  };

  const emailValidation = {
    required: "Email is required.",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email address.",
    },
  };

  const passwordValidation = {
    required: "Password is required.",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long.",
    },
  };

  const confirmPasswordValidation = (password: string) => ({
    required: "Confirming password is required.",
    validate: (value: string) =>
      value === password || "Passwords do not match.",
  });

  return (
    <>
      <div
        className="registerBackdrop"
        style={{
          backgroundImage: `url(${backdrop})`,
        }}
      >
        <div className="register-overlay pointer-events-none"></div>
      </div>
      <div className="registerContainer">
        <div className="content registerContent">
          <div className="header">
            <img src={logo} className="logo" />
            <h1 className="title">Sign up to SeenIt!</h1>
            <p className="signInText">
              Already have an account?{" "}
              <Link to="/register" className="signInLink">
                Sign in
              </Link>{" "}
            </p>
          </div>
          <div className="register">
            <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
              <div className="form-group">
                <label className="label">Username</label>
                <input
                  type="text"
                  {...register("username", usernameValidation)}
                  className="form-control"
                />
                <p className="error-message">{errors.username?.message}</p>
              </div>
              <div className="form-group">
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register("email", emailValidation)}
                  className="form-control"
                />
                <p className="error-message">{errors.email?.message}</p>
              </div>
              <div className="form-group">
                <label className="label">Password</label>
                <input
                  type="password"
                  {...register("password", passwordValidation)}
                  className="form-control"
                />
                <p className="error-message">{errors.password?.message}</p>
              </div>
              <div className="form-group">
                <label className="label">Confirm Password</label>
                <input
                  type="password"
                  {...register(
                    "confirmPassword",
                    confirmPasswordValidation(password)
                  )}
                  className="form-control"
                />
                <p className="error-message">
                  {errors.confirmPassword?.message}
                </p>
              </div>
              {apiError && <p className="api-error-message">{apiError}</p>}
              <button type="submit" className="submitButton">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
