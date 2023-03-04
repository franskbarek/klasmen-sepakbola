import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts, productSelectors, updateProduct } from "../features/productSlice";

export default function EditProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => productSelectors.selectById(state, id));

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
    }
  }, [product]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await dispatch(updateProduct({ id, title, price }));
    navigate("/");
  };

  return (
    <div className="">
      <div className="underline mb-2">Edit Product</div>
      <form className="shadow-md p-4" onSubmit={handleUpdate}>
        <div className="block">
          <label className="block">Title : </label>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="block mt-5">
          <label className="block">Price : </label>
          <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <button className="bg-sky-500 rounded mt-2 p-1 w-full">Update</button>
      </form>
    </div>
  );
}
