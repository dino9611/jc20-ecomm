import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../helpers";
import { toast } from "react-toastify";

export const login = (data) => {
  return {
    type: "LOGIN",
    payload: data,
  };
};

export const loginAction = ({ username, password }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let res = await axios.post(`${API_URL}/auth/login`, {
        username: username,
        email: username,
        password,
      });
      dispatch({ type: "LOGIN", payload: res.data });
      // dispatch(login(res.data[0]));
      localStorage.setItem("token", res.headers["x-token-access"]);
      toast.success("berhasil Login", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    } catch (error) {
      toast.error(error.response.data.message || "network error", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
      // dispatch({
      //   type: "ERROR",
      //   payload: error.response.data.message || "network error",
      // });
    } finally {
      dispatch({ type: "DONE" });
    }
  };
};

export const registerAction = ({ username, password, email }) => {
  // cek dulu username yang sama di database
  // kalo ada datanya berarti tidak bisa
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let res1 = await axios.post(`${API_URL}/auth/register`, {
        username,
        password,
        email,
      });
      dispatch({ type: "LOGIN", payload: res1.data });
      // pasang token on localstorage
      localStorage.setItem("token", res1.headers["x-token-access"]);
      toast.success("berhasil register", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    } catch (error) {
      // dispatch({
      //   type: "ERROR",
      //   payload: error.response.data.message || "network error",
      // });
      toast.error(error.response.data.message || "network error", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    } finally {
      dispatch({ type: "DONE" });
    }
  };
};
