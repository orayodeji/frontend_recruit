/* eslint-disable react/prop-types */
import moment from "moment";
import { useSelector } from "react-redux";
import { FaRegBookmark } from "react-icons/fa";
import PropTypes from "prop-types";
import EmergencyLogin from "./EmergencyLogin";
import Modal from "./Modal";
import { useState } from "react";

const JobDetailsComponent = ({ jobObject }) => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const [showConfirm, setShowConfirm] = useState(false);
  const content = (
    <div className="container w-100 d-flex flex-column align-items-center  h-100 pt-4">
      <h4 className=" text-center">
        Are you sure you want apply for this job ?
      </h4>
      <div className=" d-inline-flex justify-content-around w-100">
        <button className=" btn general-button">Proceed</button>

        <button
          className=" btn btn-danger"
          onClick={() => setShowConfirm(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
  const ApplyJob = () => {};

  return (
    <div className=" col-md-9  shadow-sm rounded-3 p-3">
      {showConfirm && (
        <Modal
          start={false}
          show={showConfirm}
          content={content}
          // size={"large"}
          onClose={setShowConfirm}
          pd={"0px"}
        />
      )}
      <div className=" row justify-content-between align-items-center">
        <div className=" col-auto">
          <h1>
            {jobObject.job_title}{" "}
            <span style={{ fontSize: "13px" }} className=" text-capitalize">
              {jobObject.job_mode}
            </span>
          </h1>
        </div>
        {isLoggedIn && user.type === "jobseeker" && (
          <div className=" col-auto">
            <FaRegBookmark style={{ marginRight: "9px", fontSize: "20px" }} />
            <button
              className=" btn  px-3 py-1 text-white fw-bold bg-black btn-dark"
              onClick={() => setShowConfirm(true)}
            >
              Apply
            </button>
          </div>
        )}

        {!isLoggedIn && (
          <div className=" col-auto">
            <EmergencyLogin title="Apply" />
          </div>
        )}
      </div>
      <p>
        <strong>Company: </strong> {jobObject.user.profile.name}
      </p>
      <p>
        <strong>Location: </strong>
        {jobObject.location}
      </p>
      <p className="text-capitalize">
        <strong>Industry: </strong>
        {jobObject.industry}
      </p>
      <p>
        <strong>Date Posted: </strong>{" "}
        {moment(jobObject.date_created).fromNow()}
      </p>{" "}
      <p>
        <strong>Closing Date: </strong>{" "}
        {moment(jobObject.closing_date).fromNow()}
      </p>
      <p className="text-capitalize">
        <strong>Job Type: </strong>
        {jobObject.job_type.replace(/-/g, " ")}
      </p>
      <p>
        <strong> Skills Required: </strong>
        {jobObject.skills.map((item, index) => (
          <span
            key={index}
            style={{
              marginRight: "5px",
              padding: "5px",
              // borderRadius: "",
            }}
            className="bg-success text-white rounded-3"
          >
            {item}
          </span>
        ))}{" "}
      </p>
      <p>
        {" "}
        <strong>Job Description</strong>
      </p>
      <div dangerouslySetInnerHTML={{ __html: jobObject.description }}></div>
      <p>
        <strong>Educational Requirement: </strong>
        {jobObject.educational_level}
      </p>
      <div>
        <h4>Contact Information</h4>
        <p>
          <strong>Email Address: </strong>
          {jobObject.user.email}
        </p>
        <p>
          <strong>Phone Number: </strong>
          {jobObject.user.phone_number}
        </p>
        <p>
          <strong>Location: </strong>
          {jobObject.user.profile.location}
        </p>
      </div>
    </div>
  );
};

JobDetailsComponent.propTypes = {
  jobObject: PropTypes.object,
};

export default JobDetailsComponent;
