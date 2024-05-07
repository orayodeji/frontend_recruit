/* eslint-disable react/no-unescaped-entities */
import { useSelector } from "react-redux";
import api from "../services/job";
import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobDetailsComponent from "../components/JobDetailsComponent";
import JobSeekerProfileComponent from "../components/JobSeekerProfileComponent";
import ChatBoxComp from "../components/ChatBoxComp";
import AlertService from "../services/alertService";
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
  return (
    <div className=" row justify-content-center">
      <div className="col-md-11 mb-4">
        <ul className="nav nav-pills">
          <li className="nav-item me-2">
            <a
              className={`nav-link ${activeTab === 1 ? "active" : ""}`}
              aria-current="page"
              href="#"
              onClick={() => setActiveTab(1)}
            >
              Job Details
            </a>
          </li>
          <li className="nav-item me-2">
            <a
              className={`nav-link ${activeTab === 3 ? "active" : ""}`}
              aria-current="page"
              href="#"
              onClick={() => setActiveTab(3)}
            >
              Candidate's Profile
            </a>
          </li>

          <li className="nav-item me-2">
            <a
              className={`nav-link ${activeTab === 2 ? "active" : ""}`}
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
        <JobDetailsComponent jobObject={pageData.job} />
      )}
      {activeTab === 3 && pageData !== null && (
        <JobSeekerProfileComponent user={pageData.job_seeker} readOnly={true} />
      )}
      {activeTab === 2 && pageData !== null && (
        <ChatBoxComp trails={pageData.messages} performAction={sendMessage} />
      )}
    </div>
  );
};

export default SingleApplication;
