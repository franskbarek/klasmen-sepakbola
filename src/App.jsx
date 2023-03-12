import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InputDataClub from "./components/InputDataClub";
import InputMultipleDataScore from "./components/InputMultipleDataScore";
import InputSingleDataScore from "./components/InputSingleDataScore";
import Navbar from "./components/Navbar";
import ViewClassment from "./components/ViewClassment";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
      </div>
      <div className="flex justify-around m-5">
        <Routes>
          <Route path="/" element={<ViewClassment />} />
          <Route path="/input-data-club" element={<InputDataClub />} />
          <Route path="/input-score-single" element={<InputSingleDataScore />} />
          <Route path="/input-score-multi" element={<InputMultipleDataScore />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
