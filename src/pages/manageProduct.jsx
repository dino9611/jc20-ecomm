import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../helpers";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";

const ManageProduct = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [totalData, settotalData] = useState(0);
  const [data, setData] = useState([]);
  const [series, setseries] = useState([]);
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [idmenu, setidmenu] = useState(0);
  const openMenu = Boolean(anchorEl);

  const [input, setinput] = useState({
    name: "",
    price: "",
    image: "",
    stock: "",
    price: "",
    series: "",
  });

  const fetchData = async () => {
    try {
      let res = await axios.get(
        `${API_URL}/products?_page=${page + 1}&_limit=${rowsPerPage}`
      );
      // axios.get( `${API_URL}/products?_page=${page + 1}&_limit=${rowsPerPage}`)
      // .then((res)=>{

      // }).catch((err)=>{

      // }).finally(()=>{

      // })
      // console.log('tes')
      // let res1 = await axios.get(`${API_URL}/series`);
      setData(res.data);
      // setseries(res1.data);
      settotalData(parseInt(res.headers["x-total-count"]));
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSeries = async () => {
    let res1 = await axios.get(`${API_URL}/series`);

    setseries(res1.data);
  };
  // getdata initial and diddupdate for change page
  useEffect(() => {
    fetchSeries();
  }, []);
  // ini didupdate
  useEffect(() => {
    fetchData();
    return () => {
      console.log("unmount dari manage");
    };
  }, [page, rowsPerPage]);

  //   modal
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // menu
  const handleClickMenu = (event, row) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
    setidmenu(row);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setidmenu(0);
  };

  const handleInput = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const onAddDataClick = async () => {
    // console.log(input);
    try {
      await axios.post(`${API_URL}/products`, input);
      fetchData();
      setOpen(false);
      setinput({
        name: "",
        price: "",
        image: "",
        stock: "",
        price: "",
        series: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // delete feature
  const onDeleteClick = async (id, index) => {
    // Swal.fire({
    //   title: `Are you sure delete ${data[index].name}?`,
    //   text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, delete it!'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire(
    //       'Deleted!',
    //       'Your file has been deleted.',
    //       'success'
    //     )
    //   }
    // })
    try {
      setAnchorEl(null);
      let result = await Swal.fire({
        title: `Are you sure delete ${data[index].name}?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        await axios.delete(`${API_URL}/products/${id}`);
        if (data.length == 1) {
          // klo data yang terlihat tinggal 1 di page tersebut
          setPage(page - 1);
        } else {
          fetchData();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalData) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderForm = (inputpar, handleCb) => {
    return (
      <>
        <input
          className="w-full my-2 placeholder:text-slate-400  bg-white  border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-matoa-text-primary focus:ring-matoa-text-primary focus:ring-1 sm:text-sm"
          type="text"
          name="name"
          placeholder="Name"
          value={inputpar.name}
          onChange={handleCb}
        />
        <input
          className="w-full my-2 placeholder:text-slate-400  bg-white S border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-matoa-text-primary focus:ring-matoa-text-primary focus:ring-1 sm:text-sm"
          type="number"
          name="price"
          placeholder="price"
          value={inputpar.price}
          onChange={handleCb}
        />
        <input
          className="w-full my-2 placeholder:text-slate-400  bg-white S border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-matoa-text-primary focus:ring-matoa-text-primary focus:ring-1 sm:text-sm"
          type="number"
          name="stock"
          placeholder="stock"
          value={inputpar.stock}
          onChange={handleCb}
        />
        <input
          className="w-full my-2 placeholder:text-slate-400  bg-white S border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-matoa-text-primary focus:ring-matoa-text-primary focus:ring-1 sm:text-sm"
          type="text"
          name="image"
          placeholder="image"
          value={inputpar.image}
          onChange={handleCb}
        />
        <select
          value={inputpar.series}
          onChange={handleCb}
          name="series"
          className="z-10 w-full my-2 placeholder:text-slate-400  bg-white S border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-matoa-text-primary focus:ring-matoa-text-primary focus:ring-1 sm:text-sm"
        >
          <option value="" hidden>
            pilih series
          </option>
          {/* <option value="dsa">pilih seriesdsadsad</option> */}
          {series.map((val) => {
            return (
              <option value={val.name} key={val.id}>
                {val.name}
              </option>
            );
          })}
        </select>
      </>
    );
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Data</DialogTitle>
        <DialogContent dividers>{renderForm(input, handleInput)}</DialogContent>
        <DialogActions>
          <button
            className="mt-2 px-3 py-1 rounded bg-matoa-text-primary text-white"
            onClick={onAddDataClick}
          >
            Save
          </button>
          <button
            className="mt-2 px-3 py-1 rounded bg-gray-500 text-white"
            onClick={handleClose}
          >
            Close
          </button>
        </DialogActions>
      </Dialog>
      <div className="left-header-admin">header Left</div>
      <div className="mt-3 ml-72">
        <button
          className="px-3 py-1 rounded bg-matoa-text-primary text-white"
          onClick={handleClickOpen}
        >
          Add Data
        </button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>price</TableCell>
                <TableCell>series</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell min style={{ minWidth: 160 }}>
                    {row.price}
                  </TableCell>
                  <TableCell style={{ minWidth: 160 }}>{row.series}</TableCell>
                  <TableCell
                    style={{ minWidth: 160, display: "flex" }}
                    onClick={(e) => handleClickMenu(e, row.id)}
                    className="cursor-pointer"
                  >
                    Menu
                    {idmenu === row.id ? (
                      <RiArrowUpSLine className="my-1 ml-1" />
                    ) : (
                      <RiArrowDownSLine className="my-1 ml-1" />
                    )}
                  </TableCell>
                  {idmenu === row.id ? (
                    <Menu
                      anchorEl={anchorEl}
                      open={openMenu}
                      onClose={handleCloseMenu}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleCloseMenu}>
                        Edit {row.id}
                      </MenuItem>
                      <MenuItem onClick={() => onDeleteClick(row.id, index)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  ) : null}
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[2, 4, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={totalData}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default ManageProduct;
