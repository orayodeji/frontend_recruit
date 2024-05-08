/* eslint-disable no-unused-vars */
import { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../services/job";
import moment from "moment";
import GoBackBTN from "../components/GoBackBTN";
import Pagination from "../components/Pagination";

const DashboardJobs = () => {
  const { access_token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  // const _obj = {
  //   page: 1,
  //   limit: 5,
  //   search: "",
  // };

  // const [searchObj, setSearchObj] = useState(_obj);
  const [jobs, setJobs] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const getData = useCallback(
    async (current_page, search) => {
      try {
        const { data } = await api.EmployerJobs(
          current_page,
          access_token,
          search
        );
        console.log(data);
        setJobs(data.body);
        setTotalPages(data.pagination_data.total_pages);
        setPageCount(data.pagination_data.current_page);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
        setLoading(false);
      }
    },
    [access_token]
  );

  useEffect(() => {
    getData(1, search);
  }, []);

  const NextPage = (pageNumber) => {
    getData(pageNumber, search);
  };

  const trackEnterKey = (e) => {
    if (e.key === "Enter") {
      console.log("do validate");
      if (search.length > 0) {
        getData(1, e.target.value);
      }
    }
    if (e.target.value === "") {
      getData(1, e.target.value);
    }
  };
  const commentSubmitForm = () => {
    console.log("Hello World");
    if (search.length > 0) {
      getData(1, search);
    } else {
      getData(1, "");
    }
  };

  return (
    <div className="bg-white p-3 rounded-3">
      <GoBackBTN />

      <div className=" general-color-text">
        <h2> Jobs</h2>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-11">
          <div
            style={{
              display: "flex",
              marginTop: "10px",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              className=" general-border-color"
              value={search}
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
              {/* <MdSend style={{ color: "white" }} /> */}
            </button>
          </div>
        </div>
      </div>
      <div className=" row justify-content-center">
        <div className="col-md-11">
          <table className="table table-bordered text-capitalize">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Job Title</th>
                <th scope="col">Job Mode</th>
                <th scope="col">Job Type</th>
                <th scope="col">Location</th>
                <th scope="col">Date Created</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {jobs.length > 0 ? (
                jobs.map((item, index) => (
                  <tr key={index} className="  general-color-text">
                    <th className=" fw-bold">{index + 1}</th>
                    <th className=" fw-bold">{item.job_title}</th>
                    <th className=" fw-normal">{item.job_mode}</th>
                    <th className=" fw-normal">
                      {item.job_type.replace(/-/g, " ")}
                    </th>
                    <th className=" fw-normal">{item.location}</th>
                    <th className=" fw-normal">
                      {moment(item.date_created).format("DD-MMM-yy")}
                    </th>
                    <th>
                      <Link
                        to={`/single-dashboard-job/${item.id}`}
                        className=" btn btn-primary"
                      >
                        {" "}
                        View Job{" "}
                      </Link>
                    </th>
                  </tr>
                ))
              ) : (
                <tr>
                  <th colSpan={7} style={{ textAlign: "center" }}>
                    There Are No Jobs Created By This Employer
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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

export default DashboardJobs;
