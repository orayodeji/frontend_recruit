import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const CreateAccount = async (data) => {
  return await axios.post(`${BASE_URL}api/create-account`, data);
};

const CreateJobSeekerProfile = async (data) => {
  return await axios.post(`${BASE_URL}api/create-profile-job-seeker`, data);
};

const CreateEmployerProfile = async (data) => {
  return await axios.post(`${BASE_URL}api/create-profile-employer`, data);
};

const LoginUser = async (data) => {
  return await axios.post(`${BASE_URL}api/login`, data);
};

export default {
  CreateAccount,
  CreateJobSeekerProfile,
  LoginUser,
  CreateEmployerProfile,
};
