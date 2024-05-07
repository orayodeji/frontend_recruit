/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import Modal from "../components/Modal";
import api from "../services/employer";
import { useCallback } from "react";
import AlertService from "../services/alertService";
import Editor from "react-simple-wysiwyg";
import Education from "../assets/educationLevel.json";
import { saveUser } from "../store/reducer/auth";
import { MdEdit } from "react-icons/md";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";
const JobSeekerProfileComponent = ({ readOnly, user }) => {
  const { access_token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const _eduObj = {
    educational_level: "",
    course: "",
    institution: "",
    city: "",
    country: "",
    start_date: "",
    stop_date: "",
  };

  const [eduObj, setEduObj] = useState(_eduObj);
  const _skillObj = { name: "", level: "" };
  const _workObj = {
    description: "",
    job_title: "",
    company_name: "",
    start_date: "",
    stop_date: "",
  };
  const [workObj, setWorkObj] = useState(_workObj);
  const dispatch = useDispatch();
  const [skillObj, setSkillObj] = useState(_skillObj);
  const [skillModal, setSkillModal] = useState(false);
  const [workModal, setWorkModal] = useState(false);
  const [eduModal, setEduModal] = useState(false);
  const delEduAction = useCallback(
    async (id) => {
      try {
        const { data } = await api.DeleteEducation(id, access_token);
        let newUser = { ...user, profile: data.body };
        dispatch(saveUser(newUser));
        AlertService.displaySuccessAlert(data.response_description);
      } catch (error) {
        setLoading(false);
        AlertService.displayErrorAlert(
          error.response.data.response_description
        );
      }
    },
    [access_token, dispatch, user]
  );
  const delWorkAction = useCallback(
    async (id) => {
      try {
        const { data } = await api.DeleteWork(id, access_token);
        let newUser = { ...user, profile: data.body };
        dispatch(saveUser(newUser));
        AlertService.displaySuccessAlert(data.response_description);
      } catch (error) {
        console.log(error.response);
        setLoading(false);
        AlertService.displayErrorAlert(
          error.response.data.response_description
        );
      }
    },
    [access_token, dispatch, user]
  );
  const AddEditEducation = async () => {
    setLoading(true);
    try {
      const { data } = await api.AddEditEducation(eduObj, access_token);
      let newUser = { ...user, profile: data.body };
      dispatch(saveUser(newUser));
      AlertService.displaySuccessAlert(data.response_description);
      setEduModal(false);
      setLoading(false);
      setWorkObj(_workObj);
    } catch (error) {
      setLoading(false);
      AlertService.displayErrorAlert(error.response.data.response_description);
    }
  };
  const AddEditExperience = async () => {
    setLoading(true);
    try {
      const { data } = await api.AddEditWork(workObj, access_token);
      let newUser = { ...user, profile: data.body };
      dispatch(saveUser(newUser));
      AlertService.displaySuccessAlert(data.response_description);
      setWorkModal(false);
      setLoading(false);
      setWorkObj(_workObj);
    } catch (error) {
      setLoading(false);
      AlertService.displayErrorAlert(error.response.data.response_description);
    }
  };

  const AddSkillAction = async () => {
    setLoading(true);
    try {
      const { data } = await api.AddSkill(skillObj, access_token);

      let newUser = { ...user, profile: data.body };
      dispatch(saveUser(newUser));
      setSkillObj(_skillObj);
      AlertService.displaySuccessAlert(data.response_description);
      setSkillModal(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      AlertService.displayErrorAlert(error.response.data.response_description);
    }
  };

  const e_content = (
    <div className=" p-2 px-4 py-3">
      <h4 className="text-primary">
        {eduObj.id ? "Edit" : "Add"} Educational Qualification
      </h4>
      <div className="form-group mt-2">
        <label htmlFor="" className="fw-bold form-label">
          Name of Instituion
        </label>
        <input
          type="text"
          value={eduObj.institution}
          className="form-control"
          placeholder="Name of Institution"
          onChange={(e) =>
            setEduObj({ ...eduObj, institution: e.target.value })
          }
        />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="" className="fw-bold form-label">
          Level
        </label>
        <select
          name=""
          id=""
          className="form-control"
          value={eduObj.educational_level}
          onChange={(e) =>
            setEduObj({ ...eduObj, educational_level: e.target.value })
          }
        >
          <option value="" disabled>
            Please select option
          </option>
          {Education.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {eduObj.educational_level !== "High School" && (
        <div className="form-group mt-2">
          <label htmlFor="" className="fw-bold form-label">
            Course
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Course"
            value={eduObj.course}
            onChange={(e) => setEduObj({ ...eduObj, course: e.target.value })}
          />
        </div>
      )}
      <div className="form-group mt-2">
        <label htmlFor="" className="fw-bold form-label">
          City
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="City Of Institution"
          value={eduObj.city}
          onChange={(e) => setEduObj({ ...eduObj, city: e.target.value })}
        />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="" className="fw-bold form-label">
          Country
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Country Of Institution"
          value={eduObj.country}
          onChange={(e) => setEduObj({ ...eduObj, country: e.target.value })}
        />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="" className="fw-bold form-label">
          Start Date
        </label>
        <input
          type="date"
          className="form-control"
          value={eduObj.start_date}
          onChange={(e) => setEduObj({ ...eduObj, start_date: e.target.value })}
        />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="" className="fw-bold form-label">
          Stop Date
        </label>
        <input
          type="date"
          className="form-control"
          value={eduObj.stop_date}
          onChange={(e) => setEduObj({ ...eduObj, stop_date: e.target.value })}
        />
      </div>
      <div className=" mt-3">
        <button className=" w-100 btn-primary btn" onClick={AddEditEducation}>
          {loading ? "Please wait.." : "Proceed"}
        </button>
      </div>
    </div>
  );
  const w_content = (
    <div className="p-2">
      <h4>{workObj.id ? "Edit" : "Add"} Work Experience</h4>

      <div className="form-group">
        <label htmlFor="" className=" form-label fw-bold">
          Job Title
        </label>
        <input
          type="text"
          className=" form-control"
          value={workObj.job_title}
          onChange={(e) =>
            setWorkObj({ ...workObj, job_title: e.target.value })
          }
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className=" form-label fw-bold">
          {/* Company's Name */}
          Company&apos;s Name
        </label>
        <input
          type="text"
          className=" form-control"
          value={workObj.company_name}
          onChange={(e) =>
            setWorkObj({ ...workObj, company_name: e.target.value })
          }
        />
      </div>
      <div className="form-group col-md-12 mt-2">
        <label className=" form-label fw-bold">Job Description</label>

        <Editor
          value={workObj.description}
          onChange={(e) =>
            setWorkObj({ ...workObj, description: e.target.value })
          }
        />
      </div>
      <div className=" form-group mt-2">
        <label htmlFor="" className="fw-bold form-label">
          Start Date
        </label>
        <input
          type="date"
          className="form-control"
          // min={new Date().toISOString().split("T")[0]}
          value={workObj.start_date}
          onChange={(e) =>
            setWorkObj({ ...workObj, start_date: e.target.value })
          }
        />
      </div>
      <div className=" form-group mt-2">
        <label htmlFor="" className="fw-bold form-label">
          Stop Date
        </label>
        <input
          type="date"
          className="form-control"
          // min={new Date().toISOString().split("T")[0]}
          value={workObj.stop_date}
          onChange={(e) =>
            setWorkObj({ ...workObj, stop_date: e.target.value })
          }
        />
      </div>
      <div className="mt-3">
        <button className=" w-100 btn btn-primary " onClick={AddEditExperience}>
          Proceed
        </button>
      </div>
    </div>
  );

  const content = (
    <div className="p-2">
      <h4>Add Skills</h4>

      <div className=" form-group">
        <label htmlFor="" className=" form-label fw-bold">
          Skill Name
        </label>
        <input
          type="text"
          value={skillObj.name}
          placeholder="Please enter a skill"
          className="form-control"
          onChange={(e) => setSkillObj({ ...skillObj, name: e.target.value })}
        />
      </div>
      <div className=" form-group mt-2">
        <label htmlFor="" className=" form-label fw-bold">
          Skill Level
        </label>
        <select
          name=""
          id=""
          className="form-control"
          value={skillObj.level}
          onChange={(e) => setSkillObj({ ...skillObj, level: e.target.value })}
        >
          <option value="" disabled>
            Please Select Level
          </option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      <div className=" mt-2">
        <button
          className=" btn btn-primary w-100"
          disabled={loading}
          onClick={AddSkillAction}
        >
          {loading ? "Please wait..." : "Proceed"}
        </button>
      </div>
    </div>
  );
  return (
    <>
      {eduModal && (
        <Modal
          start={true}
          show={eduModal}
          content={e_content}
          size={"large"}
          onClose={setEduModal}
          pd={"0px"}
        />
      )}
      {workModal && (
        <Modal
          start={true}
          show={workModal}
          content={w_content}
          size={"large"}
          onClose={setWorkModal}
          pd={"0px"}
        />
      )}
      {skillModal && (
        <Modal
          start={true}
          show={skillModal}
          content={content}
          size={"large"}
          onClose={setSkillModal}
          pd={"0px"}
        />
      )}
      <div className="row justify-content-center">
        <div className="col-md-11">
          <div className="row">
            <div className="col-md-6 mt-2">
              <label htmlFor="" className="form-label">
                {" "}
                First Name{" "}
              </label>
              <input
                type="text"
                disabled
                value={user.profile.first_name}
                className=" form-control"
              />
            </div>
            <div className="col-md-6 mt-2">
              <label htmlFor="" className="form-label">
                {" "}
                Last Name{" "}
              </label>
              <input
                type="text"
                disabled
                value={user.profile.last_name}
                className=" form-control"
              />
            </div>
            <div className="col-md-6 mt-2">
              <label htmlFor="" className="form-label">
                {" "}
                Other Name{" "}
              </label>
              <input
                type="text"
                value={user.profile.other_name}
                className=" form-control"
                disabled
              />
            </div>
            <div className="col-md-6 mt-2">
              <label htmlFor="" className="form-label">
                {" "}
                Gender
              </label>
              <select
                name=""
                disabled
                id=""
                value={user.profile.gender}
                className=" form-control text-capitalize"
              >
                <option value="" disabled>
                  Please Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="col-md-6 mt-2">
              <label htmlFor="" className="form-label">
                {" "}
                Phone Number{" "}
              </label>
              <input
                type="text"
                value={user.phone_number}
                className=" form-control"
                disabled
              />
            </div>
            <div className="col-md-6 mt-2">
              <label htmlFor="" className="form-label">
                {" "}
                Email Address{" "}
              </label>
              <input
                type="text"
                value={user.email}
                className=" form-control"
                disabled
              />
            </div>
          </div>

          <div>
            <div className="row justify-content-between mt-4 px-2">
              <div className=" col-auto">
                <h4>Educational Qualification</h4>
              </div>
              <button
                className=" col-auto btn btn-outline-primary"
                onClick={() => setEduModal(true)}
              >
                Add Qualification <FaPlus />{" "}
              </button>
            </div>

            {user.profile.educational_qualification.map((item, index) => (
              <div
                key={index}
                className="border border-secondary shadow-sm rounded-2 p-2 mt-4 position-relative  "
              >
                <div className="row justify-content-between align-items-baseline ">
                  <div className="col-auto">
                    <p style={{ fontSize: "22px" }} className=" mb-0">
                      {item.institution},{" "}
                      <span style={{ fontSize: "14px" }}>
                        {item.city}, {item.country}.
                      </span>
                    </p>

                    <p style={{ fontSize: "15px" }} className="fw-bold mb-0">
                      {item.educational_level}{" "}
                      {item.educational_level !== "High School" && "in "}
                      {item.course}
                    </p>
                    <p
                      style={{ fontSize: "12px", marginRight: "9px" }}
                      className="mb-0 fw-bold mt-0 "
                    >
                      {moment(item.start_date).format("MMM-yy")}
                      {` - ${moment(item.stop_date).format("MMM-yy")}`}
                    </p>
                  </div>
                  <div className=" col-auto d-inline-flex align-items-center">
                    <MdDelete
                      className=" text-danger position-absolute"
                      style={{
                        right: "10px",
                        bottom: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => delEduAction(item.id)}
                    />
                    <MdEdit
                      className=""
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setEduObj({
                          ...eduObj,
                          id: item.id,
                          start_date: new Date(Date.parse(item.start_date))
                            .toISOString()
                            .split("T")[0],
                          stop_date: new Date(Date.parse(item.stop_date))
                            .toISOString()
                            .split("T")[0],
                          course: item.course,
                          educational_level: item.educational_level,
                          country: item.country,
                          city: item.city,
                          institution: item.institution,
                          company_name: item.company_name,
                        });
                        setEduModal(true);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="row justify-content-between mt-3 px-2">
              <div className=" col-auto">
                <h4>Skills</h4>
              </div>
              <button
                className=" col-auto btn btn-outline-primary"
                onClick={() => setSkillModal(true)}
              >
                Add Skills <FaPlus />{" "}
              </button>
            </div>

            {user.profile.skills.map((item, index) => (
              <div
                className="row justify-content-between shadow-sm rounded-3 my-2 py-2 px-2"
                key={index}
              >
                <div className="col-auto text-capitalize">
                  <p className=" mb-0">
                    {item.name}{" "}
                    <span
                      className=" bg-success px-2 py-1 rounded-2 text-white fw-bold"
                      style={{ fontSize: "9px" }}
                    >
                      {item.level}
                    </span>
                  </p>
                </div>
                <div className="col-auto">
                  <MdEdit
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSkillObj({
                        ...skillObj,
                        name: item.name,
                        level: item.level,
                      });
                      setSkillModal(true);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="row justify-content-between mt-4 px-2">
              <div className=" col-auto">
                <h4>Word Experience</h4>
              </div>
              <button
                className=" col-auto btn btn-outline-primary"
                onClick={() => setWorkModal(true)}
              >
                Add Experience <FaPlus />{" "}
              </button>
            </div>

            {user.profile.work_experience.map((item, index) => (
              <div
                key={index}
                className="border border-secondary shadow-sm rounded-2 p-2 mt-4  position-relative"
              >
                <MdDelete
                  className=" text-danger position-absolute"
                  style={{
                    right: "10px",
                    bottom: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => delWorkAction(item.id)}
                />
                <div className="row justify-content-between align-items-baseline ">
                  <div className="col-auto">
                    <p style={{ fontSize: "22px" }} className=" mb-0">
                      {item.job_title}
                    </p>
                    <p style={{ fontSize: "12px" }} className="fw-bold">
                      {item.company_name}
                    </p>
                  </div>
                  <div className=" col-auto d-inline-flex align-items-center">
                    <p
                      style={{ fontSize: "14px", marginRight: "9px" }}
                      className="mb-0 fw-bold"
                    >
                      {moment(item.start_date).format("MMM-yy")}
                      {` - ${moment(item.stop_date).format("MMM-yy")}`}
                    </p>
                    <MdEdit
                      className=""
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setWorkObj({
                          ...workObj,
                          id: item.id,
                          start_date: new Date(Date.parse(item.start_date))
                            .toISOString()
                            .split("T")[0],
                          stop_date: new Date(Date.parse(item.stop_date))
                            .toISOString()
                            .split("T")[0],
                          description: item.description,

                          job_title: item.job_title,
                          company_name: item.company_name,
                        });
                        setWorkModal(true);
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{ fontSize: "13px" }}
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

JobSeekerProfileComponent.propTypes = {
  readOnly: PropTypes.bool,
  user: PropTypes.object,
};
export default JobSeekerProfileComponent;
