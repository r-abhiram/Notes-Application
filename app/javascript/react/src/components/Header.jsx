import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState("");
  const history = useNavigate();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    if (userDetails) {
      setUser(userDetails.email);
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div>
      <nav className="navbar bg-body-tertiary bg-dark">
        <Link
          to="/"
          className="navbar-brand ms-3 fw-bold"
          style={{ textDecoration: "none", color: "black" }}
        >
          Notes Application
        </Link>

        <div className="d-flex align-items-center me-3">
          <p className="me-4 mb-0">
            <b>User:</b> {user}
          </p>
          <i
            className="bi bi-box-arrow-right"
            style={{ fontSize: "1.3rem", cursor: "pointer" }}
            onClick={handleLogOut}
          ></i>
        </div>
      </nav>
    </div>
  );
};

export default Header;
