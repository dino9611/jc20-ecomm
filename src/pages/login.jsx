import { useState } from "react";
import {
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Container } from "../components/general";
import LoginFoto from "./../assets/tangan.jpg";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import useLoading from "../hooks/useLoading";

const CssFormControl = styled(FormControl)({
  "& label.Mui-focused": {
    color: "#D84727",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#D84727",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#D84727",
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
      borderColor: "#D84727",
    },
    "&:hover fieldset": {
      borderColor: "#D84727",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#D84727",
    },
  },
});

const Login = () => {
  const [input, setinput] = useState({
    username: "",
    password: "",
  });

  const { loading, doneAction, loadingAction } = useLoading();

  const handleInput = (e, prop) => {
    setinput({ ...input, [prop]: e.target.value });
  };

  return (
    <Container className={"mt-5"}>
      <div className=" flex rounded-lg bg-white shadow-jutsu overflow-hidden ">
        <div className="w-3/5 h-image-login  ">
          <img
            src={LoginFoto}
            width="100%"
            className="object-cover"
            style={{ height: "100%" }}
          />
        </div>
        <div className="w-2/5 px-6 py-8 flex flex-col justify-center">
          <div className="text-3xl text-center text-matoa-text-primary">
            Login {loading ? "abc" : "def"}
          </div>
          <form>
            <div className="mt-4">
              <CssTextField
                label="Username"
                type="text"
                sx={{ width: "100%" }}
                onChange={(e) => handleInput(e, "username")}
                value={input.username}
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
              <button
                onClick={() => loadingAction()}
                className="p-3 rounded bg-matoa-text-primary text-white "
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Login;
