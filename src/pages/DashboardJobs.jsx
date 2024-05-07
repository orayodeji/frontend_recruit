/* eslint-disable no-unused-vars */
import { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../services/job";
import moment from "moment";
const DashboardJobs = () => {
  const { access_token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const _obj = {
    page: 1,
    limit: 5,
    search: "",
  };

  const [searchObj, setSearchObj] = useState(_obj);
  const [jobs, setJobs] = useState([]);
  const getData = useCallback(async () => {
    try {
      const { data } = await api.EmployerJobs(searchObj, access_token);
      console.log(data);
      setJobs(data.body);

      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  }, [access_token, searchObj]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
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
                <tr key={index}>
                  <th>{index + 1}</th>
                  <th>{item.job_title}</th>
                  <th>{item.job_mode}</th>
                  <th>{item.job_type.replace(/-/g, " ")}</th>
                  <th>{item.location}</th>
                  <th>{moment(item.date_created).format("DD-MMM-yy")}</th>
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
  );
};

export default DashboardJobs;
