import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getProducts, productSelectors } from "../features/productSlice";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";

export default function ShowProducts() {
  const dispatch = useDispatch();
  const products = useSelector(productSelectors.selectAll);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Product", width: 500 },
    { field: "price", headerName: "Price", width: 130 },
    {
      field: "",
      headerName: "",
      width: 100,
      renderCell: (cellValue) => {
        return (
          <div>
            <Link to={`edit/${cellValue.id}`}>
              <button className="px-2" title="Edit">
                <Edit />
              </button>
            </Link>
            <button className="px-2" title="Delete" onClick={() => dispatch(deleteProduct(cellValue.id))}>
              <Delete />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ height: 550, width: "65%" }}>
      <div className="underline mb-2">Show Products</div>
      <DataGrid rows={products} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
    </div>
  );
}
