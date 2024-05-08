import PropTypes from "prop-types";
import moment from "moment";
import colors from "../assets/colors.json";
import { Link } from "react-router-dom";
const JobPosting = ({ jobObject }) => {
  return (
    <div className="col-md-6">
      <Link to={`/job/${jobObject.id}`}>
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title" style={{ color: colors.primary }}>
              {jobObject.job_title}{" "}
              <span className=" text-capitalize" style={{ fontSize: "13px" }}>
                ({jobObject.job_type.replace(/-/g, " ")})
              </span>{" "}
            </h4>
            {jobObject.user && (
              <h6
                className="card-subtitle mb-2 fw-bold"
                style={{ color: colors.gray }}
              >
                {jobObject.user.profile.name}{" "}
                <span style={{ fontSize: "11px" }} className=" fw-bold">
                  {jobObject.location}
                </span>
              </h6>
            )}

            <p className=" mb-0">
              <span
                className=" text-capitalize fw-bold text-black-50"
                style={{ fontSize: "13px" }}
              >
                £{jobObject.salary} / {jobObject.salary_type}
              </span>
            </p>
            <p className=" mb-0">
              <span className=" text-capitalize general-color-text fw-bold">
                {jobObject.job_mode}
              </span>
            </p>
            <p className=" mb-0 general-color-text fw-bold">
              Skills Needed:
              {jobObject.skills.length > 0 &&
                jobObject.skills.map((i, index) => (
                  <span
                    style={{ fontSize: "10px" }}
                    key={index}
                    className=" me-1 bg-primary p-1 rounded-1 mt-0 fw-bold ms-1 text-white general-button"
                  >
                    {i}
                  </span>
                ))}
            </p>

            <div className="text-info fw-bold text-primary">
              <span className=" general-color-text">
                {moment(jobObject.date_created).fromNow()}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

JobPosting.propTypes = { jobObject: PropTypes.object };
JobPosting.defaultProps = { jobObject: null };
export default JobPosting;
