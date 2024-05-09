import { useState } from "react";
import api from "../services/job";
import AlertService from "../services/alertService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateJobForm from "../components/CreateJobForm";
import GoBackBTN from "../components/GoBackBTN";

const CreateJob = () => {
  const navigate = useNavigate();
  const { access_token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const _obj = {
    job_title: "",
    location: "",
    skills: [],
    job_type: "",
    job_mode: "",
    salary: "",
    salary_type: "",
    educational_level: "",
    educational_qualification: "",
    industry: "",
    closing_date: "",
    description: "",
  };

  const [formObj, setFormObj] = useState(_obj);

  /**
   * @description
   * This method is used to create job post in the application.
   */
  const performAction = async () => {
    setLoading(true);
    try {
      const { status, data } = await api.CreateJob(formObj, access_token);
      /* The code block `if (status === 200) { navigate(`/single-dashboard-job/${data.body.id}`); }` is
      checking if the HTTP status code received from the API response is equal to 200, which typically
      indicates a successful request. If the status is indeed 200, it then uses the `navigate` function
      to redirect the user to a specific route, in this case, it redirects the user to the route
      `/single-dashboard-job/${data.body.id}`. This likely means that after successfully creating a job
      post, the user is redirected to a page where they can view the details of the newly created job
      post. */
      if (status === 200) {
        navigate(`/single-dashboard-job/${data.body.id}`);
      }

      /* The code `AlertService.displaySuccessAlert(data.response_description);` is displaying a success
      alert message with the description received from the API response data. This alert is likely
      informing the user that the job post creation was successful. */
      AlertService.displaySuccessAlert(data.response_description);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      AlertService.displayErrorAlert(error.response.data.response_description);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8 bg-white shadow-sm rounded-2 py-md-5 py-3 px-md-4 px-3">
        <GoBackBTN />
        <div className="">
          <h1 className=" general-color-text fw-bold">Create Job</h1>
        </div>
        <CreateJobForm
          formObj={formObj}
          setFormObj={setFormObj}
          loading={loading}
          performAction={performAction}
        />
      </div>
    </div>
  );
};

export default CreateJob;
