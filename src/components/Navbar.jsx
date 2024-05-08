import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaFile } from "react-icons/fa";
import { MdDashboard, MdOutlineWork } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { logout } from "../store/reducer/auth";
import { useDispatch } from "react-redux";
import { MdLogout } from "react-icons/md";
const Navbar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light  border-bottom border-2 general-border-color">
      <div className="container-fluid">
        <Link
          to={"/"}
          className="navbar-brand border general-border-color rounded-circle p-2 border-3 general-color-text"
        >
          LRA
        </Link>

        <div className=" mt-md-0 mt-2" id="navbarNav">
          <ul className="navbar-nav me-auto"></ul>
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
                  <span className="border general-border-color rounded-circle p-2 border-3 general-color-text  me-1">
                    {user.type === "jobseeker"
                      ? user.profile.first_name[0]
                      : user.profile.name[0]}
                  </span>
                  <span className="d-none">
                    {user.type === "jobseeker"
                      ? user.profile.first_name
                      : user.profile.name}
                  </span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li className=" text-center general-color-text fw-bold">
                    <span>
                      {" "}
                      {user.type === "jobseeker"
                        ? user.profile.first_name
                        : user.profile.name}
                    </span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  {user.type === "employer" && (
                    <>
                      <li>
                        <Link
                          to="/dashboard"
                          className="dropdown-item d-inline-flex align-items-center general-color-text fw-bold"
                          href="#"
                          style={{ fontSize: "14px" }}
                        >
                          <MdDashboard
                            style={{ fontSize: "14px" }}
                            className="fa-2x"
                          />
                          <span className=" ms-2">Dashboard</span>
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/dashboard-jobs"
                          className="dropdown-item d-inline-flex align-items-center general-color-text fw-bold"
                          href="#"
                          style={{ fontSize: "14px" }}
                        >
                          <MdOutlineWork
                            style={{ fontSize: "14px" }}
                            className="fa-2x"
                          />
                          <span className=" ms-2">My Jobs</span>
                        </Link>
                      </li>
                    </>
                  )}
                  {user.type === "jobseeker" && (
                    <li>
                      <Link
                        to="/profile"
                        className="dropdown-item d-inline-flex align-items-center general-color-text fw-bold"
                        href="#"
                      >
                        <IoMdPerson
                          style={{ fontSize: "14px" }}
                          className="fa-2x"
                        />
                        Profile
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link
                      to="/applications"
                      className="dropdown-item d-inline-flex align-items-center general-color-text fw-bold"
                      href="#"
                      style={{ fontSize: "14px" }}
                    >
                      <FaFile style={{ fontSize: "14px" }} className="fa-2x" />
                      <span className=" ms-2">Applications</span>
                    </Link>
                  </li>

                  <li>
                    <a
                      className="dropdown-item d-inline-flex align-items-center text-danger fw-bold"
                      href="#"
                      onClick={() => {
                        console.log("Hello world");

                        dispatch(logout());

                        navigate("/");
                      }}
                    >
                      <MdLogout
                        style={{ fontSize: "14px" }}
                        className="fa-2x"
                      />
                      <span className=" ms-2">Logout</span>
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
