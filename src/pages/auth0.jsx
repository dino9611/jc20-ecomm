import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "../components/general";

const Auth0 = () => {
  const {
    error,
    user, // user berisi data
    logout,
    loginWithRedirect,
    loginWithPopup,

    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();
  const [token, setToken] = useState("");

  const generateToken = async () => {
    let token = await getAccessTokenSilently();
    setToken(token);
  };

  return (
    <Container>
      <div>
        <div>
          <div className="my-2">
            <button className="p-3 bg-green-300">login With PopUp</button>
          </div>
          <div className="my-2">
            <button onClick={loginWithRedirect} className="p-3 bg-green-300">
              login WithRedirect
            </button>
          </div>
          <div className="my-2">
            <button onClick={generateToken} className="p-3 bg-green-300">
              Generate Token
            </button>
          </div>
          <div>{isLoading ? "lagi Loading" : "sudah loading"}</div>
          <div className="my-2">
            {isAuthenticated ? (
              <button
                onClick={() =>
                  logout({ returnTo: "http://localhost:3000/auth0" })
                }
                className="p-3 bg-red-300"
              >
                logout
              </button>
            ) : null}
          </div>
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <div>{JSON.stringify(user)}</div>
        <div>{token}</div>
        <div>{isAuthenticated ? "udah login" : "belum login"}</div>
        <div>{window.location.origin}</div>
      </div>
    </Container>
  );
};

export default Auth0;
