import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
// import { isNumber } from "../../utils";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../../store/reducer/auth";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const _obj = {
    phone_number: "07456210345",
    password: "Bolaji93,",
    email: "orayodeji@gmail.com",
    type: "jobseeker",
  };
  const [formObj, setFormObj] = useState(_obj);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const RegisterUser = async () => {
    try {
      let { payload } = await dispatch(createAccount(formObj));
      console.log(payload);
      if (payload.status === 200) {
        navigate("/create-profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="justify-content-center row align-items-center pt-4 bg-white-50"
      style={{ minHeight: "100vh" }}
    >
      <div className=" col-lg-5 col-md-8 shadow-sm p-4 bg-white rounded-3">
        <div>
          <h1 className="general-color-text">Please Register Your Account!</h1>
          <div className="mt-2">
            <label
              htmlFor=""
              className="form-label fw-bold general-color-text"
              style={{ fontSize: "16px" }}
            >
              Type <span className=" text-danger">*</span>
            </label>
            <select
              name=""
              id=""
              value={formObj.type}
              className="form-control"
              onChange={(e) => setFormObj({ ...formObj, type: e.target.value })}
            >
              <option value="" disabled>
                Please enter user type
              </option>
              <option value="jobseeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
          </div>
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
              Phone Number <span className=" text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              maxLength={14}
              value={formObj.phone_number}
              placeholder="Enter Your Phone Number"
              // onKeyDown={(e) => isNumber(e)}
              onChange={(e) =>
                setFormObj({ ...formObj, phone_number: e.target.value })
              }
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
              onClick={RegisterUser}
              disabled={
                isLoading ||
                formObj.email === "" ||
                formObj.password === "" ||
                formObj.phone_number === "" ||
                formObj.type === ""
              }
            >
              {isLoading ? "Please wait.." : "Proceed"}
            </button>
            <div className=" text-end mt-2 ">
              <Link className="general-color-text fw-bold" to="/login">
                You have an account already? Login!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
