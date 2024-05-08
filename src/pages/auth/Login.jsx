import { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authUser } from "../../store/reducer/auth";
const Login = () => {
  const _obj = {
    email: "",
    password: "",
  };

  const [formObj, setFormObj] = useState(_obj);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const actionFunc = async () => {
    const { payload } = await dispatch(authUser(formObj));

    if (payload.status === 201) {
      if (payload.data.body.profile_setup) {
        if (payload.data.body.type === "jobseeker") {
          navigate("/");
        } else {
          navigate("/dashboard");
        }
      } else {
        navigate("/create-profile");
      }
    }
  };
  return (
    <div
      className="justify-content-center row align-items-center pt-4 bg-white-50 "
      style={{ minHeight: "100vh" }}
    >
      <div className=" col-lg-4 col-md-8 shadow-sm p-4 bg-white rounded-3">
        <div>
          <h1 className=" general-color-text">Please Login!</h1>

          <div className="mt-2">
            <label
              htmlFor=""
              className="fw-bold form-label general-color-text"
              style={{ fontSize: "16px" }}
            >
              Email Address <span className=" text-danger">*</span>
            </label>
            <input
              type="text"
              className=" form-control"
              onKeyDown={(e) => console.log(e)}
              value={formObj.email}
              onChange={(e) => {
                console.log(e);
                setFormObj({ ...formObj, email: e.target.value });
              }}
              placeholder="Please enter your email address"
            />
          </div>

          <div className="mt-2">
            <label
              htmlFor=""
              className="form-label fw-bold general-color-text"
              style={{ fontSize: "16px" }}
            >
              Password <span className=" text-danger">*</span>
            </label>
            <div className=" position-relative">
              {!showPassword && (
                <FaEyeSlash
                  style={{ right: "5px", top: "11px" }}
                  className="position-absolute"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
              {showPassword && (
                <FaRegEye
                  style={{ right: "5px", top: "11px" }}
                  className=" position-absolute"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}

              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={formObj.password}
                placeholder="Enter your password"
                onChange={(e) =>
                  setFormObj({ ...formObj, password: e.target.value })
                }
              />
            </div>
          </div>
          <div className=" w-100 mt-2">
            <button
              className=" btn btn-primary text-center w-100 mt-2"
              onClick={actionFunc}
              disabled={
                isLoading || formObj.email === "" || formObj.password === ""
              }
            >
              {isLoading ? "Please wait.." : "Proceed"}
            </button>
            <div className=" text-end mt-2">
              <Link
                to="/register"
                className=" text-end mt-4 general-color-text fw-bold"
              >
                Dont have an account? Register!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
