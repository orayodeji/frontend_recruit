import { useState, useEffect, useCallback } from "react";
import api from "../services/job";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import GoBackBTN from "../components/GoBackBTN";
import Pagination from "../components/Pagination";
const Applications = () => {
  const { access_token, user } = useSelector((state) => state.auth);
  const { slug } = useParams();
  const [jobObject, setJobObject] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /**
   * @description
   * This method is used to fetch the list of applications of the current logged in user.
   */
  const GetApplications = useCallback(
    async (current_page) => {
      try {
        const { data } = await api.FetchApplications(
          access_token,
          current_page
        );
        console.log(data);
        setApplicants(data.body);
        setTotalPages(data.pagination_data.total_pages);
        setPageCount(data.pagination_data.current_page);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
    [access_token]
  );
  useEffect(() => {
    GetApplications(1);
  }, []);
  const NextPage = (pageNumber) => {
    GetApplications(pageNumber);
  };

  return (
    <div className=" container-lg  bg-white p-3 rounded-3 mt-3">
      <GoBackBTN />
      <div className=" general-color-text">
        <h2>Job Applications </h2>
      </div>
      <div className=" row justify-content-center">
        <div className="col-md-12">
          <table className="table table-bordered text-capitalize shadow-sm">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Date Applied</th>
                <th scope="col">Job Title</th>
                <th scope="col">Applicant Name</th>
                <th scope="col">Application Status</th>
                <th scope="col">Interview Date</th>
                <th></th>
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
                    <th className=" fw-bold">{item.job.job_title}</th>
                    <th className=" fw-normal">
                      {item.job_seeker.profile.first_name}{" "}
                      {item.job_seeker.profile.last_name}
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
                  <th colSpan={5} style={{ textAlign: "center" }}>
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
      </div>
    </div>
  );
};

export default Applications;
