import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createJobSeekerProfile } from "../../store/reducer/auth";
import AlertService from "../../services/alertService";
import Industry from "../../assets/industry.json";
const CreateJobSeekerProfile = () => {
  const dispatch = useDispatch();
  const { isLoading, userId } = useSelector((state) => state.auth);
  const _obj = {
    first_name: "Muhammed",
    last_name: "Ben",
    other_name: "",
    gender: "male",
    location: "",
    industry: "healthcare",
    date_of_birth: "",
  };
  const [formObj, setFormObj] = useState(_obj);
  const navigate = useNavigate();

  /**
   * @description
   * This method is used to create or update a job seeker's profile in the application.
   */
  const JobSeekerProfileAction = async () => {
    const dateOfBirth = new Date(formObj.date_of_birth); // date of birth
    const currentDate = new Date(); // current date

    const age = Math.floor(
      (currentDate - dateOfBirth) / (365.25 * 24 * 60 * 60 * 1000)
    );

    if (age < 18) {
      AlertService.displayErrorAlert(
        "Error: You must be at least 18 years old to proceed."
      );
      return;
    }

    let { payload } = await dispatch(
      createJobSeekerProfile({ ...formObj, id: userId })
    );
    console.log(payload);
    if (payload.status === 201) {
      navigate("/");
    }
  };

  return (
    <div className="col-md-8 col-lg-5 bg-white-50 pt-4 rounded-3 shadow-sm rounded-1 p-4">
      <h1 className=" general-color-text">Complete Your Account</h1>
      <div className="mt-2">
        <label
          htmlFor=""
          className=" form-label fw-bold general-color-text"
          style={{ fontSize: "16px" }}
        >
          First Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          value={formObj.first_name}
          className="form-control"
          placeholder="First Name"
          onChange={(e) =>
            setFormObj({ ...formObj, first_name: e.target.value })
          }
        />
      </div>
      <div className="mt-2">
        <label
          htmlFor=""
          className=" form-label fw-bold general-color-text"
          style={{ fontSize: "16px" }}
        >
          Last Name <span className="text-danger">*</span>
        </label>
        <input
          placeholder="Last Name"
          type="text"
          value={formObj.last_name}
          className="form-control"
          onChange={(e) =>
            setFormObj({ ...formObj, last_name: e.target.value })
          }
        />
      </div>
      <div className="mt-2">
        <label
          htmlFor=""
          className=" form-label fw-bold general-color-text"
          style={{ fontSize: "16px" }}
        >
          Other Name
        </label>
        <input
          type="text"
          placeholder="Other Name"
          value={formObj.other_name}
          className="form-control"
          onChange={(e) =>
            setFormObj({ ...formObj, other_name: e.target.value })
          }
        />
      </div>
      <div className="mt-2">
        <label
          htmlFor=""
          className=" form-label fw-bold general-color-text"
          style={{ fontSize: "16px" }}
        >
          Location <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          placeholder="Location"
          value={formObj.location}
          className="form-control"
          onChange={(e) => setFormObj({ ...formObj, location: e.target.value })}
        />
      </div>
      <div className="mt-2">
        <label
          htmlFor=""
          className=" form-label fw-bold general-color-text"
          style={{ fontSize: "16px" }}
        >
          Gender <span className="text-danger">*</span>
        </label>
        <select
          name=""
          className="form-control"
          id=""
          value={formObj.gender}
          onChange={(e) => setFormObj({ ...formObj, gender: e.target.value })}
        >
          <option value="" disabled>
            Please select gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className=" mt-2">
        <label
          htmlFor=""
          className="form-label fw-bold general-color-text"
          style={{ fontSize: "16px" }}
        >
          Industry <span className="text-danger">*</span>
        </label>
        <select
          name=""
          id=""
          className="form-control text-capitalize"
          value={formObj.industry}
          onChange={(e) => setFormObj({ ...formObj, industry: e.target.value })}
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
      <div className="mt-2">
        <label
          htmlFor=""
          className=" form-label fw-bold general-color-text"
          style={{ fontSize: "16px" }}
        >
          Date Of Birth <span className="text-danger">*</span>
        </label>
        <input
          type="date"
          value={formObj.date_of_birth}
          className="form-control"
          onChange={(e) =>
            setFormObj({ ...formObj, date_of_birth: e.target.value })
          }
        />
      </div>

      <div className=" mt-3">
        <button
          className=" w-100 btn-primary btn"
          disabled={
            formObj.date_of_birth === "" ||
            formObj.first_name === "" ||
            formObj.last_name === "" ||
            formObj.gender === "" ||
            formObj.industry === "" ||
            isLoading
          }
          onClick={JobSeekerProfileAction}
        >
          {isLoading ? "Please wait..." : "Proceed"}
        </button>
      </div>
    </div>
  );
};

export default CreateJobSeekerProfile;
