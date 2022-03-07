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
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../helpers";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ManageProduct = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [totalData, settotalData] = useState(0);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const fetchData = async () => {
    let res = await axios.get(
      `${API_URL}/products?_page=${page + 1}&_limit=${rowsPerPage}`
    );

    setData(res.data);
    settotalData(parseInt(res.headers["x-total-count"]));
  };
  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);
  //   modal
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
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

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Data</DialogTitle>
        <DialogContent dividers>
          <input
            className="w-full my-2 placeholder:text-slate-400  bg-white  border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-matoa-text-primary focus:ring-matoa-text-primary focus:ring-1 sm:text-sm"
            type="text"
            placeholder="Name"
          />
          <input
            className="w-full my-2 placeholder:text-slate-400  bg-white S border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-matoa-text-primary focus:ring-matoa-text-primary focus:ring-1 sm:text-sm"
            type="number"
            placeholder="price"
          />
          <input
            className="w-full my-2 placeholder:text-slate-400  bg-white S border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-matoa-text-primary focus:ring-matoa-text-primary focus:ring-1 sm:text-sm"
            type="number"
            placeholder="stock"
          />
          <input
            className="w-full my-2 placeholder:text-slate-400  bg-white S border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-matoa-text-primary focus:ring-matoa-text-primary focus:ring-1 sm:text-sm"
            type="text"
            placeholder="image"
          />
        </DialogContent>
        <DialogActions>
          <button
            className="mt-2 px-3 py-1 rounded bg-matoa-text-primary text-white"
            onClick={handleClose}
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
              {data.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell min style={{ minWidth: 160 }}>
                    {row.price}
                  </TableCell>
                  <TableCell style={{ minWidth: 160 }}>{row.series}</TableCell>
                  <TableCell>series</TableCell>
                  <TableCell onClick={handleClickMenu}>Menu</TableCell>

                  <Menu
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleCloseMenu}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleCloseMenu}>
                      Profile {row.id}
                    </MenuItem>
                    <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
                    <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
                  </Menu>
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
