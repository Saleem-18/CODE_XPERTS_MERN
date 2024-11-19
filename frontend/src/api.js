import axios from "axios";
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api",
});

const getAuthToken = () => {
  const token = localStorage.getItem("token");
  console.log("Token from localStorage: ", token);
  return token;
};

export const apiCall = (
  endpoint,
  data,
  method = "POST",
  contentType = "application/json"
) => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": contentType,
  };

  if (token) {
    headers["token"] = `${token}`;
  } else {
    console.log("No token found, proceeding without Authorization header.");
  }

  return api({
    url: endpoint,
    method,
    data,
    headers,
  })
    .then((response) => {
      console.log("API Response: ", response);
      return response;
    })
    .catch((error) => {
      console.error("API Call Error: ", error);
      throw error;
    });
};

export default api;
