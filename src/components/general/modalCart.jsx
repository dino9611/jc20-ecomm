import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useReducer } from "react";
import useUser from "../../hooks/useUser";

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
  const renderCart = () => {
    if (!isLogin) {
      //   kalau belum login ini yang dirender
      return <div>belum login</div>;
    }
    return state.map((val, index) => {
      return (
        <div key={val.id}>
          <div>
            {val.name} {val.qty}
          </div>
          <div>
            <button
              onClick={() => dispatch({ type: "Tbhqty", index: index })}
              className="w-1/2 bg-slate-400"
            >
              +
            </button>
            <button
              disabled={state[index].qty < 2}
              className="w-1/2 bg-pink-400 disabled:bg-orange-500"
              onClick={() => dispatch({ type: "krgqty", index: index })}
            >
              -
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <Dialog open={open} onClose={() => setopen(false)}>
      {/* <DialogTitle>Modal Cart</DialogTitle */}
      <DialogContent>{renderCart()}</DialogContent>
      <DialogActions>
        {/* <Button onClick={() => setopen(false)}>Close</Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default ModalCart;
