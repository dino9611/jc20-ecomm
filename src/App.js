import "./App.css";
import { Header } from "./components/general";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import ManageProduct from "./pages/manageProduct";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "./helpers";
import { useDispatch } from "react-redux";
import Register from "./pages/register";
import ProductDetail from "./pages/productDetail";
import useUser from "./hooks/useUser";
import Admin from "./pages/admin";
import NotFound from "./pages/notFound";
import Verified from "./pages/verified";

function App() {
  const { roleId } = useUser();
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  const keepLog = async () => {
    try {
      let token = localStorage.getItem("token");
      if (token) {
        let res = await axios.get(`${API_URL}/auth/keeplogin`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        // masukkan ke redux
        dispatch({ type: "LOGIN", payload: res.data });
      }
    } catch (error) {
      console.log(error);
      dispatch({ error: "network error" });
    } finally {
      setloading(false);
    }
  };
  // ini didmount
  useEffect(() => {
    keepLog();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#E5E5E5" }}>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* <Route path="/product/*" element={<ProductDetail />} />
          <Route path="/product/:category" element={<ProductDetail />} /> */}
          <Route path="/product/:category/:id" element={<ProductDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verified/:token" element={<Verified />} />
          {roleId === 1
            ? [
                <Route path="/admin" element={<Admin />} />,
                <Route
                  path="/admin/manage/product"
                  element={<ManageProduct />}
                />,
              ]
            : null}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
