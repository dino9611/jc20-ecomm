import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useReducer } from "react";
import useUser from "../../hooks/useUser";
import { converToRupiah } from "./../../helpers";
import { FiTrash2 } from "react-icons/fi";
const INITIAL_STATE = [
  {
    id: 1,
    name: "Singo Maple",
    image: "https://i.imgur.com/G6x1bGq_d.webp?maxwidth=760&fidelity=grand",
    stock: 10,
    price: 1280000,
    series: "Maple",
    serieId: 1,
    qty: 2,
  },
  {
    id: 2,
    name: "Singo Ebony",
    image: "https://i.imgur.com/Pr9R9dw_d.webp?maxwidth=760&fidelity=grand",
    stock: 10,
    price: 960000,
    series: "Ebony",
    serieId: 2,
    qty: 1,
  },
  {
    id: 1,
    name: "Singo Maple",
    image: "https://i.imgur.com/G6x1bGq_d.webp?maxwidth=760&fidelity=grand",
    stock: 10,
    price: 1280000,
    series: "Maple",
    serieId: 1,
    qty: 2,
  },
  {
    id: 2,
    name: "Singo Ebony",
    image: "https://i.imgur.com/Pr9R9dw_d.webp?maxwidth=760&fidelity=grand",
    stock: 10,
    price: 960000,
    series: "Ebony",
    serieId: 2,
    qty: 1,
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "Tbhqty":
      return state.map((val, index) => {
        if (action.index === index) {
          return { ...val, qty: val.qty + 1 };
        }
        return val;
      });
    case "krgqty":
      return state.map((val, index) => {
        if (action.index === index) {
          return { ...val, qty: val.qty - 1 };
        }
        return val;
      });
    default:
      throw state;
  }
};

const ModalCart = ({ open, setopen }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { isLogin } = useUser();

  const renderTotal = () => {
    // let total = 0;
    // state.forEach((element) => {
    //   total += element.price * element.qty;
    // });

    // return total;
    return state.reduce((prev, val) => {
      return prev + val.qty * val.price;
    }, 0);
  };

  const renderCart = () => {
    if (!isLogin) {
      //   kalau belum login ini yang dirender
      return <div>belum login</div>;
    }
    return state.map((val, index) => {
      return (
        <div key={val.id} className="text-matoa-text flex h-[25vh] mb-3 ">
          <div className="w-2/12 px-5 bg-matoa-primary mr-3  ">
            <div className=" w-[100%] h-[100%]">
              <img
                style={{ width: "100%", height: "100%" }}
                src={val.image}
                alt={val.name}
                className="object-cover"
              />
            </div>
          </div>
          <div className="w-5/12 px-5">
            <div className="text-xl mb-4">{val.name}</div>
            <div className="text-lg font-bold mb-2">
              {converToRupiah(val.price)}
            </div>
            <div className="font-thin mb-2">Custom Engrave</div>
            <div className="font-thin ">"Happy Birthday"</div>
          </div>
          <div className="w-5/12 flex flex-col items-end">
            <div>Select Packaging</div>
            <select className="text-sm mt-2 bg-white border-[1px] px-2 focus:border-slate-500  border-slate-300">
              <option value="">Wooden Packaging (Rp.50.000)</option>
            </select>
            <div className="mt-5 flex">
              <div>
                <button
                  disabled={state[index].qty < 2}
                  className="px-2 mr-3 disabled:text-inherit text-white border-[1px] bg-matoa-text-primary    disabled:bg-transparent  disabled:border-slate-300"
                  onClick={() => dispatch({ type: "krgqty", index: index })}
                >
                  -
                </button>
              </div>
              <div className="py-1">{val.qty}</div>
              <div>
                <button
                  onClick={() => dispatch({ type: "Tbhqty", index: index })}
                  className="px-2 ml-3 text-white disabled:text-inherit   border-[1px]  bg-matoa-text-primary"
                >
                  +
                </button>
              </div>
              <div className="py-1 w-[150px]  text-lg ml-3 mr-3 font-semibold">
                {converToRupiah(val.price * val.qty)}
              </div>
              <div className="py-1 text-lg  font-semibold">
                <button className="p-1 bg-white ml-3 text-sm  border-[1px]  border-matoa-text-primary">
                  <FiTrash2 className="text-matoa-text-primary" />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <Dialog
      open={open}
      // sx={{ maxWidth: "100%" }}
      maxWidth="false"
      onClose={() => setopen(false)}
    >
      {/* <DialogTitle>Modal Cart</DialogTitle */}
      <DialogContent sx={{ minWidth: "1000px" }}>{renderCart()}</DialogContent>
      <DialogActions>
        <div className="my-3 w-full ">
          <Button
            onClick={() => setopen(false)}
            variant="contained"
            sx={{ minWidth: "100%" }}
          >
            Checkout {converToRupiah(renderTotal())}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default ModalCart;
