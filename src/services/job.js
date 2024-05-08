import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const EmployerJobs = async (current_page, token, search = "") => {
  return await axios.get(
    `${BASE_URL}api/employers-jobs?search=${search}&page=${current_page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const FindJob = async (page, search = "") => {
  try {
    const res = await axios.get(
      `${BASE_URL}api/get-jobs?page=${page}&search=${search}`
    );
    return res.data;
  } catch (error) {
    return error.response;
  }
};

const SingleJob = async (id) => {
  return await axios.get(`${BASE_URL}api/get-jobs/${id}`);
};

const CreateJob = async (data, token) => {
  return await axios.post(`${BASE_URL}api/create-job`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const FindSuitableCandidate = async (id, token) => {
  return await axios.get(`${BASE_URL}api/get-suitable-candidates/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const FetchJobApplicationForEmployers = async (id, token, page) => {
  return await axios.get(
    `${BASE_URL}api/get-job-applications-employer/${id}?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const FetchApplications = async (token, page) => {
  return await axios.get(`${BASE_URL}api/get-all-applications?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const FetchJobApplicationDetails = async (id, token) => {
  return await axios.get(`${BASE_URL}api/job-application-details/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const SendMessage = async (data, token) => {
  return await axios.post(`${BASE_URL}api/send-message`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const GetStats = async (token) => {
  return await axios.get(`${BASE_URL}api/dashboard-stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const Applyjob = async (data, token) => {
  return await axios.post(`${BASE_URL}api/apply-job`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const ShortlistCandidate = async (data, token) => {
  return await axios.post(`${BASE_URL}api/shortlist-candidate`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const TreatApplication = async (data, token) => {
  return await axios.post(`${BASE_URL}api/treat-application`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const GetJobStatsCount = async (token) => {
  return await axios.get(`${BASE_URL}api/get-notification-counts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  FindJob,
  TreatApplication,
  SingleJob,
  CreateJob,
  EmployerJobs,
  FindSuitableCandidate,
  FetchJobApplicationForEmployers,
  FetchJobApplicationDetails,
  SendMessage,
  ShortlistCandidate,
  GetStats,
  FetchApplications,
  Applyjob,
  GetJobStatsCount,
};
