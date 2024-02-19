import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = React.memo(() => {
  const navigate = useNavigate()
  console.log("RENDERED");
  const handleLogout = () => {
    // Clear authentication token from local storage
    localStorage.removeItem("token");
    // Navigate to the login page
    navigate("/login");
  };
  return (
    <div className="sticky-top h-100 ">
      <nav className="navbar navbar-expand-lg  bg-info  py-2">
        <div className="container">
          <div>
            <NavLink className="navbar-brand mx-auto" to="/">
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png?f=webp"
                alt="React Logo"
                width="50"
                height="50"
              />
            </NavLink>
            &nbsp;&nbsp;
            <NavLink
              className="navbar-brand title mx-auto fw-bold  fs-4"
              to="/"
            >
              REACT
            </NavLink>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#dropdown"
            aria-controls="dropdown"
            aria-expanded="false"
            aria-label="Toggle navigation "
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse text-center" id="dropdown">
            <ul className="navbar-nav set mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link  " to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  id="navbarScrollingDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  to="/ff"
                >
                  Lifecycle
                </NavLink>
                <ul
                  className="dropdown-menu bg-info"
                  aria-labelledby="navbarScrollingDropdown"
                >
                  <li>
                    <NavLink
                      className="nav-link text-center fw-bold "
                      to="/class"
                    >
                      Class
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className="nav-link text-center fw-bold"
                      to="/functional"
                    >
                      Functional
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  id="navbarScrollingDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  to="/ff"
                >
                  Hooks
                </NavLink>
                <ul
                  className="dropdown-menu bg-info"
                  aria-labelledby="navbarScrollingDropdown"
                >
                  <li>
                    <NavLink
                      className="nav-link text-center fw-bold "
                      to="/useState"
                    >
                      UseState
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="nav-link text-center fw-bold "
                      to="/useEffect"
                    >
                      UseEffect
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="nav-link text-center fw-bold "
                      to="/useContext"
                    >
                      UseContext
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="nav-link text-center fw-bold"
                      to="/useRef"
                    >
                      UseRef
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="nav-link text-center fw-bold "
                      to="/useMemo"
                    >
                      UseMemo
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="nav-link text-center fw-bold "
                      to="/useReducer"
                    >
                      UseReducer
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="nav-link text-center fw-bold "
                      to="/useCallback"
                    >
                      UseCallback
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " to="/form">
                  Forms
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/wizard">
                  Wizard
                </NavLink>
              </li>

              <li className="nav-item">
              <NavLink
                  className="nav-link "
                  id="navbarScrollingDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  to="/ff"
                >
                  Redux
                </NavLink>
                <ul
                  className="dropdown-menu bg-info"
                  aria-labelledby="navbarScrollingDropdown"
                >
                  <li>
                    <NavLink
                      className="nav-link text-center fw-bold "
                      to="/redux"
                    >
                      Basic
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className="nav-link text-center fw-bold"
                      to="/pokemon"
                    >
                      Pokemon(RTQ)
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="nav-link text-center fw-bold"
                      to="/todoSlice"
                    >
                      TodoList(Thunk)
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  id="navbarScrollingDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  to="/ff"
                >
                  Table
                </NavLink>
                <ul
                  className="dropdown-menu bg-info"
                  aria-labelledby="navbarScrollingDropdown"
                >
                  <li>
                    <NavLink
                      className="nav-link text-center fw-bold "
                      to="/table"
                    >
                      Table
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className="nav-link text-center fw-bold"
                      to="/grouping"
                    >
                      Grouping
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="nav-link text-center fw-bold"
                      to="/virtualize"
                    >
                      Virtualize
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  id="navbarScrollingDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  to="/ff"
                >
                  Query
                </NavLink>
                <ul
                  className="dropdown-menu bg-info"
                  aria-labelledby="navbarScrollingDropdown"
                >
                  <li>
                    <NavLink
                      className="nav-link text-center fw-bold "
                      to="/query"
                    >
                      Query
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className="nav-link text-center fw-bold"
                      to="/groupingdata"
                    >
                      GroupingData
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="buttons nn">
              <NavLink>
                <button
                  className="btn btn-outline-dark me-2 "
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-right-from-bracket"></i>Logout
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
});
export default NavBar;
