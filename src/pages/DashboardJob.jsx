/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import api from "../services/job";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import CreateJobForm from "../components/CreateJobForm";
import { RandomAvatar } from "react-random-avatar";
import Img1 from "../assets/img1.jpeg";
import Navbar from "../components/Navbar";

const DashboardJob = () => {
  const { access_token, user } = useSelector((state) => state.auth);
  const [loading, isLoading] = useState(true);
  const { slug } = useParams();
  const [jobObject, setJobObject] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [applicants, setApplicants] = useState([]);

  const GetApplications = useCallback(async () => {
    try {
      const { data, status } = await api.FetchJobApplicationForEmployers(
        slug,
        access_token
      );
      console.log(data);
      console.log(status);
      setApplicants(data.body);
    } catch (error) {
      console.log(error.response);
    }
  }, [access_token, slug]);
  const GetData = useCallback(async () => {
    try {
      const { data, status } = await api.SingleJob(slug);
      // console.log(data.body);
      if (status === 200) {
        setJobObject(data.body);
      }
    } catch (error) {
      console.log(error.response);
    }
  }, [slug]);

  const GetCandidates = useCallback(async () => {
    try {
      const { data, status } = await api.FindSuitableCandidate(
        slug,
        access_token
      );
      // console.log(data.body);
      setCandidates(data.body);
      console.log(status);
    } catch (error) {
      console.log(error.response);
    }
  }, [access_token, slug]);

  useEffect(() => {
    GetData();
    GetCandidates();
    GetApplications();
  }, [GetData, GetCandidates, GetApplications]);

  const [activeTab, setActiveTab] = useState(2);
  return (
    <>
      <Navbar />
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
                className={`nav-link ${activeTab === 2 ? "active" : ""}`}
                aria-current="page"
                href="#"
                onClick={() => setActiveTab(2)}
              >
                View Application(s)
              </a>
            </li>
            <li className="nav-item me-2">
              <a
                className={`nav-link ${activeTab === 3 ? "active" : ""}`}
                aria-current="page"
                href="#"
                onClick={() => setActiveTab(3)}
              >
                Suitable Candidates
              </a>
            </li>
          </ul>
        </div>

        {activeTab === 1 && jobObject !== null && (
          <div className="col-md-11">
            <CreateJobForm formObj={jobObject} setFormObj={setJobObject} />
          </div>
        )}

        {activeTab === 2 && (
          <div className="col-md-11">
            <table className="table table-bordered text-capitalize shadow-sm">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Applicant Name</th>
                  <th scope="col">Application Status</th>
                  <th scope="col">Interview Date</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {applicants.length > 0 ? (
                  applicants.map((item, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <th>
                        {item.job_seeker.profile.first_name}{" "}
                        {item.job_seeker.profile.last_name}
                      </th>
                      <th>{item.status}</th>
                      <th>
                        {item.interview_date
                          ? moment(item.interview_date).format("dd - MMM - yy")
                          : ""}
                      </th>
                      <th>
                        <Link
                          to={`/application/${item.id}`}
                          className=" btn btn-primary text-white"
                        >
                          View Application
                        </Link>
                      </th>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <th colSpan={5}>No Job Application At The Moment</th>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 3 && (
          <div className="row justify-content-between">
            {candidates.map((item, index) => (
              <div className="col-md-6" key={index}>
                <div className="card applicant-card">
                  <div className="card-body ">
                    <div className="d-inline-flex justify-content-between w-100">
                      <div>
                        <h5 className="card-title">
                          {item.first_name} {item.last_name} {item.other_name} (
                          {moment().diff(moment(item.date_of_birth), "years")})
                        </h5>
                        <p className="card-text mb-0 text-capitalize">
                          {item.gender}, {item.industry}
                        </p>
                        <p className="card-text mb-0">{item.location}</p>
                      </div>
                      <img
                        className=" rounded-2"
                        src={Img1}
                        alt=""
                        style={{ width: "80px", height: "80px" }}
                      />
                    </div>

                    <p className="mb-0 fw-bold mt-1">
                      Schools Attended :{" "}
                      {item.educational_qualification.map((item, index) => (
                        <span
                          key={index}
                          style={{ marginRight: "9px" }}
                          className=" btn-primary px-1 btn py-0 rounded-1 "
                        >
                          {item.institution}
                        </span>
                      ))}{" "}
                    </p>

                    <p className="mb-0 mt-2 fw-bold mt-1">
                      Skills:{" "}
                      {item.skills.map((it, i) => (
                        <span
                          key={i}
                          style={{ marginRight: "9px" }}
                          className=" btn-primary px-1 btn py-0 rounded-1  text-capitalize"
                        >
                          {it.name}
                        </span>
                      ))}{" "}
                    </p>

                    <button className=" btn btn-secondary text-white mt-2 w-100">
                      Shortlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardJob;
