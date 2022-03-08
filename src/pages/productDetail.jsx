import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { API_URL } from "../helpers";
const ProductDetail = () => {
  const loc = useLocation();
  const params = useParams();
  let [data, setdata] = useState({});
  const fetchProduct = async () => {
    if (!loc.state) {
      let res = await axios.get(`${API_URL}/products/${params.id}`);
      setdata(res.data);
    } else {
      setdata(loc.state);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <h1>detail</h1>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

export default ProductDetail;
