/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect } from "react";
import "../assets/css/homepage.css";
import api from "../services/job";
import JobPosting from "../components/JobPosting";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { isLoggedIn, access_token } = useSelector((state) => state.auth);

  const [stats, setStats] = useState(null);
  const getStats = useCallback(async () => {
    try {
      const { data } = await api.GetJobStatsCount(access_token);
      console.log(data);
      setStats(data.body);
    } catch (error) {
      console.log(error.response);
    }
  }, [access_token]);

  useEffect(() => {
    if (isLoggedIn) {
      getStats();
    }
  }, [getStats, isLoggedIn]);

  const _obj = {
    page: 1,
    search: "",
    pageCount: 1,
  };

  const [searchObj, setSearchObj] = useState(_obj);
  const [jobs, setJobs] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const findJobs = useCallback(async (current_page, search) => {
    try {
      console.log(current_page);
      const { body, pagination_data } = await api.FindJob(current_page, search);
      setJobs(body);

      setTotalPages(pagination_data.total_pages);
      setPageCount(pagination_data.current_page);
      console.log(body);
      console.log(pagination_data);
    } catch (error) {
      console.log(error.response);
    }
  }, []);
  const NextPage = (pageNumber) => {
    findJobs(pageNumber, search);
  };

  useEffect(() => {
    findJobs(1, search);
  }, []);
  const trackEnterKey = (e) => {
    if (e.key === "Enter") {
      console.log("do validate");
      if (search.length > 0) {
        findJobs(1, e.target.value);
      }
    }
    if (e.target.value === "") {
      findJobs(1, e.target.value);
    }
  };
  const commentSubmitForm = () => {
    console.log("Hello World");
    if (search.length > 0) {
      findJobs(1, search);
    } else {
      findJobs(1, "");
    }
  };

  return (
    <div className="h-100 row justify-content-center">
      {isLoggedIn && (
        <>
          {stats && stats.shortlistCounts > 0 && (
            <div className=" text-center">
              <span className=" text-success fw-normal">
                {" "}
                You have Been Shortlisted for{" "}
                {stats.shortlistCounts === 1 ? "a" : stats.shortlistCounts} Job
                {stats.shortlistCounts > 1 ? "s" : ""}{" "}
                <Link to="/applications" className=" fw-bold">
                  Click Here!!!
                </Link>{" "}
              </span>
            </div>
          )}

          {stats && stats.scheduledCounts > 0 && (
            <div className=" text-center">
              <span className=" text-success fw-normal ">
                {" "}
                You have Been Scheduled an Interview for{" "}
                {stats.scheduledCounts === 1 ? "a" : stats.scheduledCounts} Job
                {stats.scheduledCounts > 1 ? "s" : ""}{" "}
                <Link to="/applications" className=" fw-bold">
                  Click Here!!!
                </Link>{" "}
              </span>
            </div>
          )}
        </>
      )}
      <div
        style={{
          display: "flex",
          marginTop: "10px",
          marginBottom: "10px",
        }}
        className="col-lg-8 col-md-9 col-11"
      >
        <input
          type="text"
          className=" general-border-color"
          value={search}
          placeholder="Job Title, Location, Skills"
          onKeyDown={(e) => trackEnterKey(e)}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            borderRadius: "14px",
            width: "100%",
            padding: "10px",
          }}
        />

        <button
          className=" general-button"
          type="button"
          style={{
            padding: "5px 18px",
            fontSize: "20px",
            borderRadius: "14px",
            border: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "5px",
            cursor: "pointer",
          }}
          onClick={commentSubmitForm}
        >
          Search
        </button>
      </div>
      <div className="row col-lg-8 col-md-9 col-11">
        {jobs.length > 0 ? (
          jobs.map((item, index) => <JobPosting jobObject={item} key={index} />)
        ) : (
          <div className=" text-center">No Job Postings At The Moment</div>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          pageCount={totalPages}
          currentPage={pageCount}
          action={NextPage}
        />
      )}
    </div>
  );
};

export default HomePage;
