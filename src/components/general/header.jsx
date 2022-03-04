import { BsSearch, BsBag } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { IconButton } from "@mui/material";
import Brand from "./../../assets/brand.svg";
import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <div className="container shadow-lg bg-white  md:px-32 px-10 py-4 flex ">
      <div className="py-3">
        <img src={Brand} alt="brand" width={"95%"} />
      </div>
      <div className="flex p-2 ml-auto mr-16 justify-evenly w-3/6 ">
        <div className="text-lg tracking-wider">Watches</div>
        <div className="text-lg tracking-wider">Eyewear</div>
        <div className="text-lg tracking-wider">Accesories</div>
        <div className="text-lg tracking-wider">News</div>
      </div>
      <div className=" flex justify-between w-1/5 ">
        <IconButton size="medium">
          <BsSearch />
        </IconButton>
        <Link to="/login">
          <div className="flex p-2">
            <AiOutlineUser className="text-2xl mr-2" />
            Log In
          </div>
        </Link>
        <div className="cursor-pointer rounded-full p-2 bg-matoa-primary">
          <BsBag className="text-2xl" />
        </div>
      </div>
    </div>
  );
};
