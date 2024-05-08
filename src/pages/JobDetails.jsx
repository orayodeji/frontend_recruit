import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../services/job";
// import { FaRegBookmark } from "react-icons/fa";
// import moment from "moment";
// import { useSelector } from "react-redux";
import JobDetailsComponent from "../components/JobDetailsComponent";
const JobDetails = () => {
  const { slug } = useParams();
  const [jobObject, setJobObject] = useState(null);
  // const { user } = useSelector((state) => state.auth);

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

  useEffect(() => {
    console.log(slug);
    GetData();
  }, [GetData, slug]);
  return (
    <div className="row justify-content-center px-5 px-lg-2 py-3">
      {jobObject !== null && (
        <JobDetailsComponent jobObject={jobObject} showApplyButton={true} />
      )}
    </div>
  );
};

export default JobDetails;
