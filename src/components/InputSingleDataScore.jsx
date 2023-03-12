import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { classmentSelectors, getClassments, updateClassment } from "../features/classmentSlice";

export default function InputSingleDataScore() {
  const [match, setMatch] = useState({ homeTeam: "", awayTeam: "", homeScore: 0, awayScore: 0 });
  const allClassments = useSelector((state) => classmentSelectors.selectAll(state));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isEmptyField = () => {
    // Validasi data jika nama klub tidak diisi
    const isEmpty = match.homeTeam === "" || match.awayTeam === "";
    if (isEmpty) {
      toast.error("Maaf nama klub wajib diisi!");
      return true;
    }
    return false;
  };

  const isDuplicated = () => {
    // Validasi data pertandingan tidak boleh sama
    const isMatchExist = match.homeTeam === match.awayTeam;

    if (isMatchExist) {
      toast.error("Tim yang bertanding tidak boleh sama!");
      return true;
    }
    return false;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMatch({ ...match, [name]: value });
  };

  const handleSaveMatch = async () => {
    if (isEmptyField()) {
      return true;
    }
    if (isDuplicated()) {
      return true;
    }

    await dispatch(updateClassment({ ...match }));
    toast.success("Data berhasil disimpan.");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  useEffect(() => {
    dispatch(getClassments());
  }, [dispatch]);

  return (
    <div className="bg-blue-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Input Skor</h1>
      <div className="flex flex-col mb-4">
        <div className="flex items-center mb-2">
          <label htmlFor="homeTeam" className="mr-2">
            Tim A:
          </label>
          <select id="homeTeam" name="homeTeam" value={match.homeTeam} onChange={handleInputChange} className="px-2 py-1 rounded-md border border-gray-300">
            <option value="">-- Pilih Tim --</option>
            {allClassments &&
              allClassments.map(({ id: clubId, name: clubName }) => {
                return (
                  <option key={clubId} value={clubId}>
                    {clubName}
                  </option>
                );
              })}
          </select>
          <label htmlFor="homeScore" className="ml-2 mr-2">
            Skor A:
          </label>
          <input type="number" id="homeScore" name="homeScore" value={match.homeScore} onChange={handleInputChange} className="px-2 py-1 rounded-md border border-gray-300" />
        </div>
        <div className="flex items-center">
          <label htmlFor="awayTeam" className="mr-2">
            Tim B:
          </label>
          <select id="awayTeam" name="awayTeam" value={match.awayTeam} onChange={handleInputChange} className="px-2 py-1 rounded-md border border-gray-300">
            <option value="">-- Pilih Tim --</option>
            {allClassments &&
              allClassments.map(({ id: clubId, name: clubName }) => {
                return (
                  <option key={clubId} value={clubId}>
                    {clubName}
                  </option>
                );
              })}
          </select>{" "}
          <label htmlFor="awayScore" className="ml-2 mr-2">
            Skor B:
          </label>
          <input type="number" id="awayScore" name="awayScore" value={match.awayScore} onChange={handleInputChange} className="px-2 py-1 rounded-md border border-gray-300" />
        </div>
      </div>
      <div className="flex mb-4">
        <button className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600" onClick={handleSaveMatch}>
          Simpan
        </button>
      </div>
    </div>
  );
}
