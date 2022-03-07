import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../helpers";
import { toast } from "react-toastify";

export const loginAction = ({ username, password }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let res = await axios.get(`${API_URL}/users`, {
        params: {
          username: username,
          password,
        },
      });
      if (!res.data.length) {
        throw { message: "user tidak ditemukan" };
      }
      dispatch({ type: "LOGIN", payload: res.data[0] });
      localStorage.setItem("id", res.data[0].id);
      toast.success("berhasil Login", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message || "network error" });
    } finally {
      dispatch({ type: "DONE" });
    }
  };
};
