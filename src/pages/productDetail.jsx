import axios from "axios";
import { Container } from "./../components/general";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { API_URL, converToRupiah } from "../helpers";
import Image from "./../assets/image.png";
import Image1 from "./../assets/image-1.png";
import Image2 from "./../assets/image-2.png";
import Image3 from "./../assets/image-3.png";
import { Box, Button, Tabs, Tab } from "@mui/material";
import { BsCartPlus } from "react-icons/bs";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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
    <Container>
      <div className="mt-2">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/"
            className="text-matoa-text hover:underline hover:font-semibold"
          >
            Home
          </Link>
          <Link
            to="/"
            className="text-matoa-text hover:underline hover:font-semibold"
          >
            Products
          </Link>
          <Link
            to="/"
            className="text-matoa-text hover:underline hover:font-semibold"
          >
            Watch
          </Link>
          <div className=" text-matoa-text-primary font-semibold">
            {data.name}
          </div>
        </Breadcrumbs>
      </div>
      <div className="flex mt-10 gap-1 h-[75vh] px-10">
        <div className="w-2/12 p-5">
          <div className="h-[85px] mb-3 w-full">
            <img
              src={Image}
              className="object-contain"
              style={{ width: "100%", height: "100%" }}
              alt="image"
            />
          </div>
          <div className="h-[90px]  opacity-50 mb-3 w-full">
            <img
              src={Image1}
              className="object-contain"
              style={{ width: "100%", height: "100%" }}
              alt="image"
            />
          </div>
          <div className="h-[90px]  opacity-50 mb-3 w-full">
            <img
              src={Image2}
              className="object-contain"
              style={{ width: "100%", height: "100%" }}
              alt="image"
            />
          </div>
          <div className="h-[90px]  opacity-50 mb-3 w-full">
            <img
              src={Image3}
              className="object-contain"
              style={{ width: "100%", height: "100%" }}
              alt="image"
            />
          </div>
        </div>
        <div className="w-4/12">
          <img
            src={
              "https://i.imgur.com/yOxaGrn_d.webp?maxwidth=760&fidelity=grand"
            }
            className="object-contain"
            style={{
              height: "100%",
              width: "100%",
            }}
            alt="detail"
          />
        </div>
        <div className="w-6/12 p-5 text-matoa-text">
          <div className=" min-h-[20vh] text-5xl uppercase tracking-wider leading-snug">
            {data.name}
          </div>
          <div className="font-semibold text-xl mt-1">
            {converToRupiah(data.price)}
          </div>
          <div className="mt-5">Choose Model</div>
          <div className="mt-5 flex flex-wrap">
            <div
              className="rounded-full h-10 w-10 mr-3"
              style={{ backgroundColor: "brown" }}
            ></div>
            <div
              className="rounded-full h-10 w-10 mr-3"
              style={{ backgroundColor: "burlywood" }}
            ></div>
          </div>
          <div className="flex mt-10">
            <div className="py-2">
              <Button
                size="small"
                sx={{
                  padding: 0,
                  margin: 0,
                  minWidth: 20,
                  fontSize: 14,
                  fontFamily: "Taviraj, serif",
                }}
                color="primary"
                variant="outlined"
                // disabled
              >
                -
              </Button>
            </div>
            <Box className="mx-3 py-3 text-lg">1</Box>
            <div className="py-2">
              <Button
                color="primary"
                sx={{
                  padding: 0,
                  margin: 0,
                  minWidth: 20,
                  fontSize: 14,
                  fontFamily: "Taviraj, serif",
                }}
                variant="contained"
              >
                +
              </Button>
            </div>
            <div className="ml-5 py-1">
              <Button
                color="primary"
                variant="contained"
                startIcon={<BsCartPlus />}
              >
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <div>{JSON.stringify(data)}</div> */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={1}
          // onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
    </Container>
  );
};

export default ProductDetail;
