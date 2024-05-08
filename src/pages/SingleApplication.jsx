/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useSelector } from "react-redux";
import api from "../services/job";
import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobDetailsComponent from "../components/JobDetailsComponent";
import JobSeekerProfileComponent from "../components/JobSeekerProfileComponent";
import ChatBoxComp from "../components/ChatBoxComp";
import AlertService from "../services/alertService";
import ApplicationStatus from "../assets/applicationStatus.json";
import Modal from "../components/Modal";
const SingleApplication = () => {
  const { user, access_token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  const [pageData, setPageData] = useState(null);
  const GetDetails = useCallback(async () => {
    try {
      const { data, status } = await api.FetchJobApplicationDetails(
        slug,
        access_token
      );

      console.log(data.body);
      console.log(status);

      setPageData(data.body);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  }, [access_token, slug]);

  useEffect(() => {
    GetDetails();
  }, [GetDetails]);
  const [activeTab, setActiveTab] = useState(1);
  const sendMessage = async (msg) => {
    try {
      const { data } = await api.SendMessage(
        { message: msg, id: slug },
        access_token
      );
      setPageData(data.body);
      AlertService.displaySuccessAlert(data.response_description);
    } catch (error) {
      AlertService.displayErrorAlert(error.response.data.response_description);
    }
  };
  const _obj = { application_id: slug, status: "", date: "" };
  const [treatObj, setTreatObj] = useState(_obj);
  const [formLoading, setFormLoading] = useState(false);
  const [showTreat, setShowTreat] = useState(false);

  const TreatAction = useCallback(async () => {
    try {
      setFormLoading(true);
      const res = await api.TreatApplication(treatObj, access_token);
      AlertService.displaySuccessAlert(res.data.response_description);
      console.log(res);
      setFormLoading(false);
      setTreatObj(_obj);
      GetDetails();

      setShowTreat(false);
    } catch (error) {
      setFormLoading(false);

      AlertService.displayErrorAlert(error.response.data.response_description);
    }
  }, [GetDetails, access_token, treatObj]);

  const content = (
    <div className=" p-3 px-4 py-4">
      <h4 className=" general-color-text fw-bold">Treat Application</h4>

      <div className=" form-group mt-2">
        <label
          htmlFor=""
          className="fw-bold general-color-text"
          style={{ fontSize: "16px" }}
        >
          Status <span className=" text-danger">*</span>
        </label>
        <select
          name=""
          className=" form-control text-capitalize"
          id=""
          value={treatObj.status}
          onChange={(e) => setTreatObj({ ...treatObj, status: e.target.value })}
        >
          <option value="" disabled>
            Please Select Option
          </option>
          {ApplicationStatus.map((item, index) => (
            <option value={item} key={index}>
              {item.replace(/-/g, " ")}
            </option>
          ))}
        </select>
      </div>
      {treatObj.status === "interview-scheduled" && (
        <div className=" form-group mt-2">
          <label htmlFor="" className="fw-bold general-color-text">
            Date <span className=" text-danger">*</span>
          </label>
          <input
            type="date"
            name=""
            min={new Date().toISOString().split("T")[0]}
            id=""
            className=" form-control"
            onChange={(e) => setTreatObj({ ...treatObj, date: e.target.value })}
          />
        </div>
      )}
      <div className=" mt-3">
        <button
          className=" w-100 btn general-button "
          onClick={TreatAction}
          disabled={formLoading || treatObj.status === ""}
        >
          {formLoading ? "Please wait..." : "Proceed"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="  px-5 bg-white shadow-sm pt-2 pb-5">
      {showTreat && (
        <Modal
          // start={true}
          show={showTreat}
          content={content}
          size={"large"}
          onClose={setShowTreat}
          pd={"0px"}
        />
      )}
      <div className=" container-lg row justify-content-center">
        <div className="col-md-11 mb-2 justify-content-between d-inline-flex">
          {user.type === "jobseeker" && (
            <div>
              <p className=" mb-0 general-color-text fw-bold">
                {" "}
                Name Of Company: {pageData?.employer?.profile?.name}
              </p>
              <p className=" mb-0 general-color-text fw-bold">
                Email:{" "}
                <a href={`mailto:${pageData?.employer?.email}`}>
                  {pageData?.employer?.email}
                </a>{" "}
              </p>
              <p className=" mb-0 general-color-text fw-bold">
                Phone Number:{" "}
                <a href={`mailto:${pageData?.employer?.phone_number}`}>
                  {pageData?.employer?.phone_number}
                </a>{" "}
              </p>
              <p className=" mb-0 general-color-text fw-bold">
                Location: {pageData?.employer?.profile?.location}
              </p>
              <p className=" mb-0 general-color-text fw-bold">
                Sector: {pageData?.employer?.profile?.sector}
              </p>
              <p className=" mb-0 general-color-text fw-bold text-capitalize">
                Application Status: {pageData?.status.replace(/-/g, " ")}
              </p>
            </div>
          )}

          {user.type === "employer" && (
            <div className=" mb-2">
              <p className=" mb-0 general-color-text fw-bold">
                Name Of Applicant: {pageData?.job_seeker?.profile?.first_name}{" "}
                {pageData?.job_seeker?.profile?.last_name}
              </p>
              <p className=" mb-0 general-color-text fw-bold">
                Email:{" "}
                <a
                  href={`mailto:${pageData?.job_seeker?.email}`}
                  className=" general-color-text"
                >
                  {pageData?.job_seeker?.email}
                </a>{" "}
              </p>
              <p className=" mb-0 general-color-text fw-bold">
                Phone Number:{" "}
                <a href={`mailto:${pageData?.job_seeker?.phone_number}`}>
                  {pageData?.job_seeker?.phone_number}
                </a>{" "}
              </p>
              <p className=" mb-0 general-color-text fw-bold">
                Location: {pageData?.job_seeker?.profile?.location}
              </p>
              <p className=" mb-0 general-color-text fw-bold">
                Sector: {pageData?.job_seeker?.profile?.industry}
              </p>
              <p className=" mb-0 general-color-text fw-bold text-capitalize">
                Application Status: {pageData?.status.replace(/-/g, " ")}
              </p>
            </div>
          )}

          {user.type === "employer" && (
            <div>
              <button
                className=" btn general-bg-color"
                onClick={() => setShowTreat(true)}
              >
                Treat Application
              </button>
            </div>
          )}
        </div>
        <div className="col-md-11 mb-1">
          <ul className="nav nav-pills">
            <li className="nav-item me-2">
              <a
                className={`nav-link ${
                  activeTab === 1 ? "active" : ""
                } general-color-text fw-bold`}
                aria-current="page"
                href="#"
                onClick={() => setActiveTab(1)}
              >
                Job Details
              </a>
            </li>
            {user.type === "employer" && (
              <li className="nav-item me-2">
                <a
                  className={`nav-link ${
                    activeTab === 3 ? "active" : ""
                  } general-color-text fw-bold`}
                  aria-current="page"
                  href="#"
                  onClick={() => setActiveTab(3)}
                >
                  Candidate's Profile
                </a>
              </li>
            )}
            <li className="nav-item me-2">
              <a
                className={`nav-link ${
                  activeTab === 2 ? "active" : ""
                } general-color-text fw-bold`}
                aria-current="page"
                href="#"
                onClick={() => setActiveTab(2)}
              >
                Messages
              </a>
            </li>
          </ul>
        </div>

        {activeTab === 1 && pageData !== null && (
          <JobDetailsComponent
            jobObject={pageData.job}
            showApplyButton={false}
          />
        )}
        {activeTab === 3 && pageData !== null && (
          <JobSeekerProfileComponent
            user={pageData.job_seeker}
            readOnly={true}
          />
        )}
        {activeTab === 2 && pageData !== null && (
          <ChatBoxComp trails={pageData.messages} performAction={sendMessage} />
        )}
      </div>
    </div>
  );
};

export default SingleApplication;
