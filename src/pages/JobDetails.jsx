import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../services/job";
import JobDetailsComponent from "../components/JobDetailsComponent";

/**
   * @description
   * This method is used to fetch the details of a job in the application.
   */
const JobDetails = () => {
  const { slug } = useParams();
  const [jobObject, setJobObject] = useState(null);

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
