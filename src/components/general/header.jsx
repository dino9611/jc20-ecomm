import { BsSearch, BsBag } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { IconButton } from "@mui/material";
import Brand from "./../../assets/brand.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ModalCart from "./modalCart";
import { useState } from "react";
export const Header = () => {
  const { username, isLogin, roleId } = useSelector((state) => state.user);
  const [open, setopen] = useState(false);
  return (
    <div className="container  md:px-32 px-10 py-4 flex ">
      <div className="py-3">
        <Link to="/">
          <img src={Brand} alt="brand" width={"95%"} />
        </Link>
      </div>
      <div className="flex p-2 ml-auto mr-16 justify-evenly w-3/6 ">
        <div className="text-lg tracking-wider">Watches</div>
        <div className="text-lg tracking-wider">Eyewear</div>
        <div className="text-lg tracking-wider">Accesories</div>
        <div className="text-lg tracking-wider">News</div>
      </div>
      <div className=" flex justify-between  w-1/5 ">
        <IconButton size="medium">
          <BsSearch />
        </IconButton>

        {isLogin ? (
          <div className="cursor-pointer flex p-2">
            <AiOutlineUser className="text-2xl mr-2" />
            {username}
          </div>
        ) : (
          <Link to="/login">
            <div className="flex p-2">
              <AiOutlineUser className="text-2xl mr-2" />
              Log In
            </div>
          </Link>
        )}
        {roleId === 1 ? (
          <Link className="p-2 min-w-max" to="/admin/manage/product">
            Manage product
          </Link>
        ) : (
          <div
            onClick={() => setopen(true)}
            className="cursor-pointer rounded-full p-2 bg-matoa-primary"
          >
            <BsBag className="text-2xl" />
          </div>
        )}
      </div>
      <ModalCart open={open} setopen={setopen} />
    </div>
  );
};
