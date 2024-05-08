import { useState } from "react";
// import Industry from "../assets/industry.json";
// import Education from "../assets/educationLevel.json";
// import { MdOutlineCancel } from "react-icons/md";
// import Editor from "react-simple-wysiwyg";
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
    job_title: "Senior Developer",
    location: "London",
    skills: ["excel", "vue", "nuxt"],
    job_type: "part-time",
    job_mode: "hybrid",
    salary: "",
    salary_type: "",
    educational_level: "",
    educational_qualification: "",
    industry: "healthcare",
    closing_date: "",
    description: "",
  };

  const [formObj, setFormObj] = useState(_obj);
  // const [inputValue, setInputValue] = useState("");

  const performAction = async () => {
    setLoading(true);
    try {
      const { status, data } = await api.CreateJob(formObj, access_token);

      // console.log(res);
      if (status === 200) {
        navigate(`/single-dashboard-job/${data.body.id}`);
      }

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
