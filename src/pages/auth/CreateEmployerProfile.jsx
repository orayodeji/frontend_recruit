import Industry from "../../assets/industry.json";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { createEmployerProfile } from "../../store/reducer/auth";
import { useNavigate } from "react-router-dom";
const CreateEmployerProfile = () => {
  const dispatch = useDispatch();
  const { isLoading, userId } = useSelector((state) => state.auth);
  const _obj = {
    name: "",
    location: "",
    sector: "",
  };
  const [formObj, setFormObj] = useState(_obj);
  const navigate = useNavigate();

  /**
   * @description
   * This method is used to create an employer's profile in the application.
   */
  const EmployerProfileAction = async () => {
    let { payload } = await dispatch(
      createEmployerProfile({ ...formObj, id: userId })
    );
    if (payload.status === 201) {
      navigate("/dashboard");
    }
  };
  return (
    <div className="col-md-8 col-lg-5 bg-white-50 pt-4 rounded-3 p-4 shadow-sm rounded-1 p-3">
      <h1 className=" general-color-text">Complete Your Account</h1>
      <div className=" mt-2">
        <label
          htmlFor=""
          className=" form-label fw-bold general-color-text"
          style={{ fontSize: "16px" }}
        >
          Name Of Company <span className=" text-danger">*</span>
        </label>
        <input
          type="text"
          className=" form-control"
          value={formObj.name}
          onChange={(e) => setFormObj({ ...formObj, name: e.target.value })}
        />
      </div>

      <div className="mt-2">
        <label
          htmlFor=""
          className=" form-label fw-bold general-color-text"
          style={{ fontSize: "16px" }}
        >
          Location <span className=" text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          value={formObj.location}
          onChange={(e) => setFormObj({ ...formObj, location: e.target.value })}
        />
      </div>
      <div className=" mt-2">
        <label
          htmlFor=""
          className="form-label fw-bold general-color-text"
          style={{ fontSize: "16px" }}
        >
          Industry <span className=" text-danger">*</span>
        </label>
        <select
          name=""
          id=""
          className="form-control text-capitalize"
          value={formObj.sector}
          onChange={(e) => setFormObj({ ...formObj, sector: e.target.value })}
        >
          <option value="" disabled>
            Please select Industry
          </option>
          {Industry.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-3">
        <button
          onClick={EmployerProfileAction}
          className="w-100 btn btn-primary"
          disabled={
            isLoading ||
            formObj.sector === "" ||
            formObj.name === "" ||
            formObj.location === ""
          }
        >
          {isLoading ? "Please wait..." : "Proceed"}
        </button>
      </div>
    </div>
  );
};

export default CreateEmployerProfile;
