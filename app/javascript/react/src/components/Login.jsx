import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        loginDetails
      );
      localStorage.setItem(
        "user",
        JSON.stringify({ id: res.data.data.id, email: res.data.data.email })
      );
      setIsError(false);
      window.location.reload();
    } catch (err) {
      setIsError(true);
      setError(err.response.data.data);
      console.log(err);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <main className="form-signin w-50 m-auto">
        <form onSubmit={handleLogin}>
          <h2 className="text-center mb-5">Notes Applicaton</h2>
          <h4 className="h4 mb-3 fw-normal">Please sign in</h4>
          {isError && (
            <div className="alert alert-warning" role="alert">
              {error}
            </div>
          )}
          <div className="form-floating mb-2">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={loginDetails.email}
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, email: e.target.value })
              }
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              autoComplete="on"
              value={loginDetails.password}
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, password: e.target.value })
              }
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          {/* <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div> */}
          <button className="btn btn-primary w-100 py-2" type="submit">
            Sign in
          </button>
          <div className="container d-flex justify-content-center">
            <p className="mt-3 mb-3 text-body-secondary">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
