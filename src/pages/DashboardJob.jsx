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
import GoBackBTN from "../components/GoBackBTN";
import Pagination from "../components/Pagination";
import AlertService from "../services/alertService";
// import ProfileJob from "../assets/myProfile.json";
const DashboardJob = () => {
  const { access_token, user } = useSelector((state) => state.auth);
  const [loading, isLoading] = useState(true);
  const { slug } = useParams();
  const [jobObject, setJobObject] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [search, setSearch] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const GetApplications = useCallback(
    async (current_page) => {
      try {
        const { data } = await api.FetchJobApplicationForEmployers(
          slug,
          access_token,
          current_page
        );
        console.log(data);
        // console.log(status);
        setApplicants(data.body);
        setTotalPages(data.pagination_data.total_pages);
        setPageCount(data.pagination_data.current_page);
      } catch (error) {
        console.log(error.response);
      }
    },
    [access_token, slug]
  );
  const GetData = useCallback(async () => {
    try {
      const { data, status } = await api.SingleJob(slug);
      console.log(data.body);
      if (status === 200) {
        setJobObject(data.body);
      }
    } catch (error) {
      console.log(error.response);
    }
  }, [slug]);
  const ShortlistCandidate = useCallback(
    async (id) => {
      try {
        let obj = {
          jobseeker_id: id,
          job_id: slug,
        };

        setFormLoading(true);
        const res = await api.ShortlistCandidate(obj, access_token);
        AlertService.displaySuccessAlert(res.data.response_description);
        console.log(res);
        setFormLoading(false);
        GetApplications(1);
      } catch (error) {
        setFormLoading(false);

        AlertService.displayErrorAlert(
          error.response.data.response_description
        );
      }
    },
    [GetApplications, access_token, slug]
  );
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
    GetApplications(1);
  }, []);
  const NextPage = (pageNumber) => {
    GetApplications(pageNumber);
  };

  // const trackEnterKey = (e) => {
  //   if (e.key === "Enter") {
  //     console.log("do validate");
  //     if (search.length > 0) {
  //       GetApplications(1, e.target.value);
  //     }
  //   }
  //   if (e.target.value === "") {
  //     GetApplications(1, e.target.value);
  //   }
  // };
  // const commentSubmitForm = () => {
  //   console.log("Hello World");
  //   if (search.length > 0) {
  //     GetApplications(1, search);
  //   } else {
  //     GetApplications(1, "");
  //   }
  // };

  useEffect(() => {
    GetData();
    GetCandidates();
  }, [GetData, GetCandidates]);

  const [activeTab, setActiveTab] = useState(2);
  return (
    <div className=" container-lg  bg-white p-3 rounded-3 mt-3">
      <GoBackBTN />
      <div className=" general-color-text">
        {jobObject !== null && <h2>Job Details For {jobObject.job_title} </h2>}
      </div>
      <div className=" row justify-content-center">
        <div className="col-md-11 mb-4 bg-white-50 bg-light p-2 rounded-2">
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
            <li className="nav-item me-2">
              <a
                className={`nav-link ${
                  activeTab === 2 ? "active" : ""
                } general-color-text fw-bold`}
                aria-current="page"
                href="#"
                onClick={() => setActiveTab(2)}
              >
                View Application(s)
              </a>
            </li>
            <li className="nav-item me-2">
              <a
                className={`nav-link ${
                  activeTab === 3 ? "active" : ""
                } general-color-text fw-bold`}
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
          <div className="col-md-12">
            <table className="table table-bordered text-capitalize shadow-sm">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Date Applied</th>
                  <th scope="col">Applicant Name</th>
                  <th scope="col">Application Status</th>
                  <th scope="col">Interview Date</th>

                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {applicants.length > 0 ? (
                  applicants.map((item, index) => (
                    <tr key={index} className=" general-color-text">
                      <th className=" fw-normal">{index + 1}</th>
                      <th className=" fw-bold">
                        {moment(item.date_created).format("ddd-MMM-yyy")}
                      </th>
                      <th className=" fw-normal">
                        {item.job_seeker?.profile?.first_name}{" "}
                        {item.job_seeker?.profile?.last_name}
                      </th>
                      <th className=" fw-normal">{item.status}</th>
                      <th className=" fw-normal">
                        {item.interview_date
                          ? moment(item.interview_date).format("dd - MMM - yy")
                          : ""}
                      </th>
                      <th className=" fw-normal">
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
                    <th colSpan={5} className=" text-center">
                      No Job Application At The Moment
                    </th>
                  </tr>
                )}
              </tbody>
            </table>
            {totalPages > 1 && (
              <Pagination
                pageCount={totalPages}
                currentPage={pageCount}
                action={NextPage}
              />
            )}
          </div>
        )}

        {activeTab === 3 && (
          <div className="row justify-content-around">
            {candidates.map((item, index) => (
              <div className="col-md-5" key={index}>
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

                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "50%",
                          border: "1px solid lightgray",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className=" fw-bold general-color-text general-border-color border-2"
                      >
                        <div>{`${item.first_name[0]}${item.last_name[0]}`}</div>
                      </div>
                      {/* <img className=" rounded-2" src={Img1} alt="" /> */}
                    </div>

                    <p className="mb-0 fw-bold mt-1">
                      Schools Attended :{" "}
                      {item.educational_qualification.map((item, index) => (
                        <span
                          key={index}
                          style={{ marginRight: "9px" }}
                          className=" btn-primary px-1 btn py-0 me-2 my-1 rounded-1 "
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

                    <button
                      onClick={() => {
                        setCandidateId(item.user);
                        ShortlistCandidate(item.user);
                      }}
                      disabled={formLoading && candidateId === item.user}
                      className=" btn  general-bg-color text-white mt-2 w-100 mt-4"
                    >
                      Shortlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardJob;
