import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{opacity: 0.7 }}>
      <div className="container-fluid">
        <Link className=" logo navbar-brand fw-bold fs-3" style={{color:'yellow'}} to="/">
          Residify
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav" >
          <ul className="navbar-nav ms-auto" >
            <li className="nav-item">
              <Link
                className="nav-link active fw-medium px-4 "
                aria-current="page"
                to="/"
                style={{color:'white'}}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active fw-medium px-4"
                aria-current="page"
                to="/login"
                style={{color:'snow'}}
              >
                Login
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle fw-medium px-4"
                to="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{color:'snow'}}
              >
                Register
              </Link>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <Link
                    className="dropdown-item fw-medium"
                    to="/register/resident"
                  >
                    Resident
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item fw-medium" to="/register/staff">
                    Staff
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;