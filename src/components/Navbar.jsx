import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
const Navbar = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light  border-bottom border-2 general-border-color">
      <div className="container-fluid">
        <Link
          to={"/"}
          className="navbar-brand border general-border-color rounded-circle p-2 border-3 general-color-text"
        >
          LRA
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
        <div className="collapse navbar-collapse mt-md-0 mt-2" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {/* <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li> */}
          </ul>
          <div className="d-flex">
            {isLoggedIn && (
              <div className="dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* <img
                  src="https://via.placeholder.com/30"
                  alt="Avatar"
                  className="rounded-circle me-2"
                /> */}
                  <span className="border general-border-color rounded-circle p-2 border-3 general-color-text  me-1">
                    {user.type === "jobseeker"
                      ? user.profile.first_name[0]
                      : user.profile.name[0]}
                  </span>
                  {user.type === "jobseeker"
                    ? user.profile.first_name
                    : user.profile.name}
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li>
                    <Link to="/profile" className="dropdown-item" href="#">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}

            {!isLoggedIn && (
              <div className="dropdown">
                <a
                  className="nav-link dropdown-toggl"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sign in / Register{" "}
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li>
                    <Link to="/login" className="dropdown-item" href="#">
                      <MdLogin style={{ fontSize: "30px" }} className="fa-2x" />
                      <span className=" ms-2">Sign In</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="dropdown-item" href="#">
                      <SiGnuprivacyguard
                        style={{ fontSize: "30px" }}
                        className="fa-2x"
                      />
                      <span className=" ms-2">Register</span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
