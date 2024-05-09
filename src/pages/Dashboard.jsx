/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { MdOutlineWork } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import api from "../services/job";
const Dashboard = () => {
  const { access_token } = useSelector((state) => state.auth);
  const [stats, setStats] = useState(null);
  const getStats = useCallback(async () => {
    try {
      const { data } = await api.GetStats(access_token);
      console.log(data);
      setStats(data.body);
    } catch (error) {
      console.log(error.response);
    }
  }, [access_token]);

  useEffect(() => {
    getStats();
  }, [getStats]);

  return (
    <div className=" px-3">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div
            className="row justify-content-between"
            style={{ paddingRight: "12rem" }}
          >
            <div className=" col-auto">
              <h3 className=" general-color-text">Company's Dashboard</h3>
            </div>
            <Link
              to="/create-job"
              className="col-auto btn btn-success general-bg-color"
            >
              Create Job
            </Link>
          </div>
        </div>
      </div>
      {stats !== null && (
        <div className="row justify-content-start border rounded-2 p-3 mt-4">
          <div className="col-lg-3 col-md-6">
            <div className="card text-white mb-3 general-bg-color">
              <div className="card-body">
                <h5 className="card-title">Total Jobs</h5>
                <p className="card-text">{stats.job_count}</p>
                <div className=" d-inline-flex justify-content-between w-100 align-items-center">
                  {/* <div> */}
                  <MdOutlineWork className=" fa-2x" />
                  {/* </div> */}

                  {/* <div> */}
                  <Link
                    className="bg-white  rounded-2 px-3 py-1 general-color-text fw-bold"
                    to={"/dashboard-jobs"}
                  >
                    View Jobs
                  </Link>
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card text-white mb-3 general-bg-color">
              <div className="card-body">
                <h5 className="card-title">Total Applications</h5>
                <p className="card-text">{stats.application_count}</p>
                <div className=" d-inline-flex w-100 justify-content-between align-items-center">
                  <FaFileAlt className=" fa-2x" />

                  <Link
                    className=" bg-white rounded-2 px-3 py-1 general-color-text fw-bold"
                    to={"/applications"}
                  >
                    View Applications
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
