import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getRiskAssessments = async () => {
  const response = await axios.get(`${BASE_URL}/risk-assessments`);
  return response.data;
};

export const getRiskAssessmentById = async (id) => {
  const response = await axios.get(`${BASE_URL}/risk-assessments/${id}`);
  return response.data;
};

export const createRiskAssessment = async (data) => {
  const response = await axios.post(`${BASE_URL}/risk-assessments`, data);
  return response.data;
};

export const updateRiskAssessment = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/risk-assessments/${id}`, data);
  return response.data;
};

export const deleteRiskAssessment = async (id) => {
  await axios.delete(`${BASE_URL}/risk-assessments/${id}`);
};
