import axios from "axios";

export const api = axios.create({
  //mudar url no final
  baseURL: "http://localhost:3333",
});
