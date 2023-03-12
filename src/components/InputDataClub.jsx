import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classmentSelectors, getClassments, saveClassment } from "../features/classmentSlice";

export default function InputDataClub() {
  const [clubName, setClubName] = useState("");
  const [clubCity, setClubCity] = useState("");
  const clubData = useSelector(classmentSelectors.selectAll);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClassments());
  }, [dispatch]);

  const handleValidation = () => {
    if (clubName === "" || clubCity === "") {
      alert("Maaf nama klub dan kota wajib diisi!");
      return true;
    }
    const clubsExist = clubData.some((club) => club.name.toLowerCase() === clubName.toLowerCase() || club.city.toLowerCase() === clubCity.toLowerCase());
    if (clubsExist) {
      alert("Klub sudah terdaftar silahkan lanjutkan input skor!");
      setClubName("");
      setClubCity("");
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      return;
    }
    try {
      setClubName("");
      setClubCity("");
      await dispatch(saveClassment({ name: clubName, city: clubCity }));
      alert("Data berhasil disimpan.");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleClubNameChange = (e) => {
    setClubName(e.target.value);
  };

  const handleClubCityChange = (e) => {
    setClubCity(e.target.value);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 my-15">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="club-name">
            Nama Klub
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="club-name"
            type="text"
            value={clubName}
            onChange={handleClubNameChange}
            placeholder="Masukkan Nama Klub"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="club-city">
            Kota Klub
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="club-city"
            type="text"
            value={clubCity}
            onChange={handleClubCityChange}
            placeholder="Masukkan Kota Klub"
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
}
