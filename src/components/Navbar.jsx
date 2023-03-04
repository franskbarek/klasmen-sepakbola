import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <Link to="/">
        <div className="bg-stone-800 text-lime-500 p-2">Show-Products</div>
      </Link>
      <Link to="add">
        <div className="bg-stone-800 text-lime-500 p-2">+New Product</div>
      </Link>
    </>
  );
}
