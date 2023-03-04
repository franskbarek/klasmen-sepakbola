import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ShowProducts from "./components/ShowProducts";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

export default function App() {
  return (
    <BrowserRouter>
      <div className="w-full px-3 flex justify-start m-5">
        <Navbar />
      </div>
      <div className="container flex justify-around m-5">
        <Routes>
          <Route path="/" element={<ShowProducts />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
