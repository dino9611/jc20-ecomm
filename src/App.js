import "./App.css";
import { Header } from "./components/general";
import { Routes, Route, useResolvedPath } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import ManageProduct from "./pages/admin/manageProduct";
import LeftNav from "./components/admin/leftNav";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "./helpers";
import { useDispatch } from "react-redux";
import Register from "./pages/register";
import ProductDetail from "./pages/productDetail";
import useUser from "./hooks/useUser";
import Admin from "./pages/admin/admin";
import NotFound from "./pages/notFound";
import Verified from "./pages/verified";
import Profile from "./pages/profile";
import AddData from "./pages/admin/addData";
import Chat from "./pages/chat";
import PublicLiveChat from "./pages/publicChat";
import { useAuth0 } from "@auth0/auth0-react";
import Auth0 from "./pages/auth0";

function App() {
  const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently } =
    useAuth0();
  const { roles_id } = useUser();
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

  const gettoken = async () => {
    let token = await getAccessTokenSilently();
    console.log(token);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#E5E5E5" }}>
      <Header />
      {/* <div>
        <pre>{JSON.stringify(user)}</pre>
      </div>
      <div>
        <pre>{JSON.stringify(isAuthenticated)}</pre>
      </div>

      <button onClick={logout}>logout</button>
      <button onClick={gettoken}>token</button> */}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* <Route path="/product/*" element={<ProductDetail />} />
          <Route path="/product/:category" element={<ProductDetail />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/public/chat" element={<PublicLiveChat />} />
          <Route path="/product/:category/:id" element={<ProductDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verified/:token" element={<Verified />} />
          <Route path="/auth0" element={<Auth0 />} />
          {roles_id === 1
            ? [
                <Route path="/admin" element={<Admin />} />,
                <Route
                  path="/admin/manage/product"
                  element={
                    <LeftNav>
                      <ManageProduct />
                    </LeftNav>
                  }
                />,
                <Route
                  path="/admin/manage/product/add"
                  element={
                    <LeftNav>
                      <AddData />
                    </LeftNav>
                  }
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
