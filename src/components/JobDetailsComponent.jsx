/* eslint-disable react/prop-types */
import moment from "moment";
import { useSelector } from "react-redux";
import { FaRegBookmark } from "react-icons/fa";
import PropTypes from "prop-types";
import EmergencyLogin from "./EmergencyLogin";
import Modal from "./Modal";
import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/job";
import AlertService from "../services/alertService";

const JobDetailsComponent = ({ jobObject, showApplyButton }) => {
  const { slug } = useParams();
  const { user, isLoggedIn, access_token } = useSelector((state) => state.auth);
  const [showConfirm, setShowConfirm] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);
  const ApplyJob = async () => {
    try {
      setApplyLoading(true);
      const { data } = await api.Applyjob({ job_id: slug }, access_token);
      AlertService.displaySuccessAlert(data.response_description);
      console.log(data);
      setApplyLoading(false);
      setShowConfirm(false);
    } catch (error) {
      setApplyLoading(false);
      AlertService.displayErrorAlert(error.response.data.response_description);
      setShowConfirm(false);
    }
  };

  const content = (
    <div className="container w-100 d-flex flex-column align-items-center  h-100 pt-4">
      <h4 className=" text-center">
        Are you sure you want apply for this job ?
      </h4>
      <div className=" d-inline-flex justify-content-around w-100">
        <button
          className=" btn general-button"
          onClick={ApplyJob}
          disabled={applyLoading}
        >
          {applyLoading ? "Please wait..." : "Proceed"}
        </button>

        <button
          className=" btn btn-danger"
          onClick={() => setShowConfirm(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className=" col-md-9 col-lg-7  shadow-lg rounded-3 p-3 px-5 px-md-3">
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
      <div className=" row justify-content-between align-items-center general-color-text">
        <div className=" col-auto">
          <h1 className=" general-color-text">
            {jobObject.job_title}{" "}
            <span
              style={{ fontSize: "13px" }}
              className=" text-capitalize fw-bold"
            >
              {jobObject.job_mode}
            </span>
          </h1>
        </div>
        {isLoggedIn && user.type === "jobseeker" && showApplyButton && (
          <div className=" col-auto">
            <FaRegBookmark
              style={{ marginRight: "9px", fontSize: "20px" }}
              className=" general-color-text"
            />
            <button
              className=" btn  px-3 py-1 text-white fw-bold  btn-dark general-button"
              onClick={() => setShowConfirm(true)}
            >
              Apply
            </button>
          </div>
        )}

        {!isLoggedIn && (
          <div className=" col-auto general-button">
            <EmergencyLogin title="Apply" />
          </div>
        )}
      </div>
      <p className=" general-color-text">
        <strong>Company: </strong> {jobObject.user.profile.name}
      </p>
      <p className=" general-color-text">
        <strong>Location: </strong>
        {jobObject.location}
      </p>
      <p className="text-capitalize general-color-text">
        <strong>Industry: </strong>
        {jobObject.industry}
      </p>
      <p className=" general-color-text">
        <strong>Date Posted: </strong>{" "}
        {moment(jobObject.date_created).fromNow()}
      </p>{" "}
      <p className=" general-color-text">
        <strong>Closing Date: </strong>{" "}
        {moment(jobObject.closing_date).fromNow()}
      </p>
      <p className="text-capitalize general-color-text">
        <strong>Job Type: </strong>
        {jobObject.job_type.replace(/-/g, " ")}
      </p>
      <p className=" general-color-text">
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
      <h3 className=" general-color-text">
        {" "}
        <strong>Job Description</strong>
      </h3>
      <div dangerouslySetInnerHTML={{ __html: jobObject.description }}></div>
      <h5 className=" general-color-text">
        <strong>Educational Requirement: </strong>
        {jobObject.educational_level}
      </h5>
      <div className=" general-color-text">
        <h3 className=" general-color-text">Contact Information</h3>
        <p className=" general-color-text">
          <strong>Email Address: </strong>
          <a
            className=" general-color-text text-decoration-underline"
            href={`mailto:${jobObject.user.email}`}
          >
            {jobObject.user.email}
          </a>
        </p>
        <p className=" general-color-text">
          <strong>Phone Number: </strong>

          <a
            className=" general-color-text text-decoration-underline"
            href={`tel:${jobObject.user.phone_number}`}
          >
            {jobObject.user.phone_number}
          </a>
        </p>
        <p className="general-color-text">
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
