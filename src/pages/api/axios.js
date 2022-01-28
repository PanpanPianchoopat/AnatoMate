import axios from "axios";

export const HTTP = axios.create({
  baseURL: "http://119.46.226.106",
  headers: {
    "Content-type": "application/json",
  },
});

export default HTTP;
