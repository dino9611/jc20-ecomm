import "./App.css";
import { Header } from "./components/general";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import ManageProduct from "./pages/manageProduct";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "./helpers";
import { useDispatch } from "react-redux";
import Register from "./pages/register";

function App() {
  const dispatch = useDispatch();
  const keepLog = async () => {
    try {
      let id = localStorage.getItem("id");
      let res = await axios.get(`${API_URL}/users/${id}`);
      // masukkan ke redux
      dispatch({ type: "LOGIN", payload: res.data });
    } catch (error) {
      console.log(error);
      dispatch({ error: "network error" });
    }
  };

  useEffect(() => {
    keepLog();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/manage/product" element={<ManageProduct />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
