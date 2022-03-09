import { Container } from "../components/general";
import Divider from "@mui/material/Divider";
import axios from "axios";

import { API_URL } from "../helpers";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Card = ({ data }) => {
  return (
    <div className="prod-card bg-white px-5 w-1/4 monthly-height">
      <div className="h-48 w-full monthly-home ">
        <img
          className="object-cover"
          style={{ width: "100%", height: "100%" }}
          src={data.image}
        />
      </div>
      <div className="text-xl my-1">{data.name}</div>
      <div className="text-slate-400 my-1">20% Off</div>
      <div className="text-xl my-1">{data.price}</div>
      <div className="add-to-cart  flex mt-5  w-100 justify-between ">
        <button className="mr-3">Love</button>
        <Link state={data} to={`/product/watches/${data.id}`}>
          <button className="px-3 flex-grow py-1 rounded bg-matoa-text-primary text-white">
            Add to cart
          </button>
        </Link>
      </div>
    </div>
  );
};

const Home = () => {
  const [monthly, setmonthly] = useState([]);

  const fetchData = async () => {
    try {
      let res = await axios.get(`${API_URL}/products?_limit=4`);
      setmonthly(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderData = () => {
    return monthly.map((val) => {
      return <Card key={val.id} data={val} />;
    });
  };

  return (
    <Container>
      <div className="mt-5 text-matoa-text">
        <h1 className="text-2xl ">Monthly Deals 10</h1>
        <Divider
          sx={{ backgroundColor: "black", width: "8%", borderColor: "#333333" }}
        />
        <div className="mt-14 gap-8  flex px-5 ">
          {/* card */}
          {renderData()}
        </div>
      </div>
    </Container>
  );
};

export default Home;
