/* eslint-disable react/prop-types */
import { useState } from "react";
import Industry from "../assets/industry.json";
import Education from "../assets/educationLevel.json";
import Editor from "react-simple-wysiwyg";
import { MdOutlineCancel } from "react-icons/md";

const CreateJobForm = ({ formObj, setFormObj, loading, performAction }) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="row">
      <div className="col-md-6 mt-2">
        <label
          htmlFor=""
          className=" form-label fw-bold general-color-text"
          style={{ fontSize: "16px" }}
        >
          Job Title <span className=" text-danger">*</span>
        </label>

        <input
          className=" form-control"
          type="text"
          placeholder="Job Title"
          value={formObj.job_title}
          onChange={(e) =>
            setFormObj({ ...formObj, job_title: e.target.value })
          }
        />
      </div>
      <div className="col-md-6 mt-2">
        <label
          htmlFor=""
          className="form-label fw-bold general-color-text"
          style={{ fontSize: "16px" }}
        >
          Job Location <span className=" text-danger">*</span>
        </label>

        <input
          className=" form-control"
          type="text"
          value={formObj.location}
          placeholder="Job Location"
          onChange={(e) => setFormObj({ ...formObj, location: e.target.value })}
        />
      </div>
      <div className="col-md-6 mt-2">
        <label
          htmlFor=""
          className=" form-label fw-bold general-color-text"
          style={{ fontSize: "16px" }}
        >
          Educational Level <span className=" text-danger">*</span>
        </label>
        <select
          name=""
          id=""
          className="form-control text-capitalize"
          value={formObj.educational_level}
          onChange={(e) =>
            setFormObj({ ...formObj, educational_level: e.target.value })
          }
        >
          <option value="" disabled>
            Please select option
          </option>
          {Education.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-6 mt-2">
        <label
          htmlFor=""
          className="fw-bold form-label general-color-text"
          style={{ fontSize: "16px" }}
        >
          Required Educational Qualification{" "}
          <span className="text-danger">*</span>
        </label>
        <input
          className=" form-control"
          type="text"
          placeholder="Required Educational Qualification"
          value={formObj.educational_qualification}
          onChange={(e) =>
            setFormObj({
              ...formObj,
              educational_qualification: e.target.value,
            })
          }
        />
      </div>

      <div className=" col-md-12 mt-2">
        <label
          htmlFor=""
          className="form-label fw-bold general-color-text"
          style={{ fontSize: "16px" }}
        >
          Skills Required <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter a skill and press enter"
          className="form-control mb-1"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputValue.trim() !== "") {
              setFormObj({
                ...formObj,
                skills: [...formObj.skills, inputValue],
              });
              //  setSkills([...skills, inputValue.trim()]);
              setInputValue("");
            }
          }}
        />
        {formObj.skills.map((item, index) => (
          <span
            key={index}
            className=" me-2 px-2 py-1  mt-2 d-inline-flex align-items-center text-secondary text-capitalize  border-secondary border rounded-pill fw-normal"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setFormObj({
                ...formObj,
                skills: formObj.skills.filter((i) => i !== item),
              });
            }}
          >
            {item}
            <MdOutlineCancel className=" text-danger ms-1 fw-bold fa-1x" />
          </span>
        ))}
      </div>
      <div className="col-md-6 mt-2">
        <label
          htmlFor=""
          className=" form-label fw-bold general-color-text"
          style={{ fontSize: "16px" }}
        >
          Job Type <span className=" text-danger">*</span>
        </label>
        <select
          name=""
          className="form-control"
          id=""
          value={formObj.job_type}
          onChange={(e) => setFormObj({ ...formObj, job_type: e.target.value })}
        >
          <option value="" disabled>
            Please select option
          </option>
          <option value="part-time">Part Time</option>
          <option value="full-time">Full Time</option>
          <option value="contract">Contract</option>
        </select>
      </div>
      <div className="col-md-6 mt-2">
        <label
          htmlFor=""
          className=" form-label fw-bold general-color-text"
          style={{ fontSize: "16px" }}
        >
          Job Mode <span className=" text-danger">* </span>
        </label>
        <select
          name=""
          className="form-control"
          id=""
          value={formObj.job_mode}
          onChange={(e) => setFormObj({ ...formObj, job_mode: e.target.value })}
        >
          <option value="" disabled>
            Please select option
          </option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="office">Office</option>
        </select>
      </div>

      <div className="form-group col-md-12 mt-2">
        <label
          className=" form-label fw-bold general-color-text"
          style={{ fontSize: "16px" }}
        >
          Job Description <span className="text-danger">*</span>
        </label>

        <Editor
          value={formObj.description}
          onChange={(e) =>
            setFormObj({ ...formObj, description: e.target.value })
          }
        />
      </div>

      <div className=" col-md-6 mt-2">
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
      <div className=" col-md-6 mt-2">
        <label
          htmlFor=""
          className="fw-bold form-label general-color-text"
          style={{ fontSize: "16px" }}
        >
          Closing Date <span className=" text-danger">*</span>
        </label>
        <input
          type="date"
          className="form-control"
          min={new Date().toISOString().split("T")[0]}
          value={formObj.closing_date}
          onChange={(e) =>
            setFormObj({ ...formObj, closing_date: e.target.value })
          }
        />
      </div>

      <div className=" mt-4">
        <button
          className=" w-100 btn btn-primary"
          disabled={loading}
          onClick={performAction}
        >
          {loading ? "Please wait..." : "Proceed"}
        </button>
      </div>
    </div>
  );
};

export default CreateJobForm;
