import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveProduct } from "../features/productSlice";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createProduct = async (e) => {
    e.preventDefault();
    await dispatch(saveProduct({ title, price }));
    navigate("/");
  };

  return (
    <div>
      <div className="underline mb-2">Add Product</div>
      <form className="shadow-md p-4" onSubmit={createProduct}>
        <div className="block">
          <label className="block">Title : </label>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="block mt-5">
          <label className="block">Price : </label>
          <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <button className="bg-sky-500 rounded mt-2 p-1 w-full">Create</button>
      </form>
    </div>
  );
}
