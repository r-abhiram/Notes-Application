import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signUpDetails, setSignUpDetails] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const history = useNavigate();

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState([]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/create",
        signUpDetails
      );
      setIsError(false);
      console.log(res.data);
      // localStorage.setItem("token", res.data.jwt);
      history("/login");
    } catch (err) {
      setIsError(true);
      setError(err.response.data.data);
      console.log(err);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <main className="form-signin w-50 m-auto">
        <form onSubmit={handleSignUp}>
          <h2 className="text-center mb-5">Notes Applicaton</h2>
          <h4 className="h4 mb-3 fw-normal">Sign Up</h4>
          {isError &&
            error.map((err, index) => (
              <div className="alert alert-warning" role="alert" key={index}>
                {err}
              </div>
            ))}
          <div className="form-floating mb-2">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={signUpDetails.email}
              onChange={(e) =>
                setSignUpDetails({ ...signUpDetails, email: e.target.value })
              }
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-2">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              autoComplete="on"
              value={signUpDetails.password}
              onChange={(e) =>
                setSignUpDetails({ ...signUpDetails, password: e.target.value })
              }
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="text"
              className="form-control"
              id="floatingConfirmPassword"
              placeholder="Confirm Password"
              value={signUpDetails.password_confirmation}
              onChange={(e) =>
                setSignUpDetails({
                  ...signUpDetails,
                  password_confirmation: e.target.value,
                })
              }
            />
            <label htmlFor="floatingPassword">Confirm Password</label>
          </div>

          <button className="btn btn-primary w-100 py-2" type="submit">
            Create an account
          </button>
          <div className="container d-flex justify-content-center">
            <p className="mt-3 mb-3 text-body-secondary">
              Already having an account? <Link to="/login">Log In</Link>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignUp;
