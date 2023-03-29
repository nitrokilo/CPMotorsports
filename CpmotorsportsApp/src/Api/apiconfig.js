import axios from "axios";
const client = axios.create({
  baseURL: "http://172.26.54.25:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;