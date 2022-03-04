import "./App.css";
import { BsSearch, BsBag } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

function App() {
  return (
    <div>
      <div className="container  md:px-40 px-10 py-4 flex bg-teal-300">
        <div className="text-3xl ">Logo</div>
        <div className="flex ml-auto mr-16 justify-between w-3/6 bg-pink-400">
          <div className="text-lg tracking-wider">Watches</div>
          <div className="text-lg tracking-wider">Eyewear</div>
          <div className="text-lg tracking-wider">Accesories</div>
          <div className="text-lg tracking-wider">News</div>
        </div>
        <div className=" flex justify-between w-1/5 bg-slate-500">
          <div>
            <BsSearch />
          </div>
          <div className="flex">
            <AiOutlineUser />
            Login
          </div>
          <div>
            <BsBag />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
