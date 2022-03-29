import { useEffect, useState } from "react";
import {
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Button, Container } from "../components/general";
import LoginFoto from "./../assets/tangan.jpg";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import useLoading from "../hooks/useLoading";
import { connect, useSelector } from "react-redux";
import { loginAction } from "../redux/actions";
import { useNavigate, Navigate, Link } from "react-router-dom";

const CssFormControl = styled(FormControl)({
  "& label.Mui-focused": {
    color: "#D84727",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#D84727",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      //   borderColor: "#D84727",
    },
    "&:hover fieldset": {
      borderColor: "#D84727",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#D84727",
    },
  },
});

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#D84727",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#D84727",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      //   borderColor: "#D84727",
    },
    "&:hover fieldset": {
      borderColor: "#D84727",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#D84727",
    },
  },
});

const Login = ({ loginAction }) => {
  const [input, setinput] = useState({
    username: "",
    password: "",
  });

  const { loading } = useLoading();
  const { isLogin } = useSelector((state) => state.user);
  const handleInput = (e, prop) => {
    setinput({ ...input, [prop]: e.target.value });
  };
  // didupdate
  // useEffect(() => {

  // });

  // didmount
  // useEffect(() => {
  // return ()=>{

  // }
  // },[]);

  const loginHandle = (e) => {
    e.preventDefault();
    loginAction(input);
  };

  if (isLogin) {
    // redirect to home

    return <Navigate to="/" replace />;
  }

  return (
    <Container className={"mt-3"}>
      <div className="flex rounded-lg bg-white shadow-jutsu overflow-hidden ">
        <div className="w-4/5 h-image-login  ">
          <img
            src={LoginFoto}
            width="100%"
            className="object-cover"
            style={{ height: "100%" }}
          />
        </div>
        <div className="w-3/5 px-8 py-8 flex flex-col justify-center">
          <div className="text-4xl text-center ">Login</div>
          <form onSubmit={loginHandle}>
            <div className="mt-4">
              <CssTextField
                // error
                label="Username"
                type="text"
                sx={{ width: "100%" }}
                onChange={(e) => handleInput(e, "username")}
                value={input.username}
                // helperText="coba"
              />
            </div>
            <div className="mt-4">
              <CssFormControl sx={{ width: "100%" }} color="">
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  type="password"
                  label="Password"
                  onChange={(e) => handleInput(e, "password")}
                  value={input.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        //   onClick={handleClickShowPassword}
                        //   onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        <MdVisibility />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </CssFormControl>
            </div>
            <div className="mt-4 ">
              <Button className="p-3" type="submit" disabled={loading}>
                Login
              </Button>
              {/* <button
                disabled={loading}
                type="submit"
                className="p-3 rounded bg-matoa-text-primary text-white "
              >
                Login
              </button> */}
              <Link className="hover:text-matoa-text-primary" to="/register">
                <div className="float-right text-sm">belum punya akun?</div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default connect(null, { loginAction })(Login);
