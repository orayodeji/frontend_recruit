import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const AddSkill = async (data, token) => {
  return await axios.post(`${BASE_URL}api/add-skill`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const AddEditWork = async (data, token) => {
  return await axios.post(`${BASE_URL}api/add-edit-work-experience`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const AddEditEducation = async (data, token) => {
  return await axios.post(
    `${BASE_URL}api/add-edit-educational-qualification`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const DeleteEducation = async (id, token) => {
  return axios.delete(`${BASE_URL}api/delete-educational-qualification/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const DeleteWork = async (id, token) => {
  return axios.delete(`${BASE_URL}api/delete-work-experience/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export default {
  AddSkill,
  AddEditWork,
  AddEditEducation,
  DeleteEducation,
  DeleteWork,
};
