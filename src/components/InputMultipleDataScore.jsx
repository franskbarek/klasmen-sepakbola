import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { classmentSelectors, getClassments, updateClassment } from "../features/classmentSlice";

export default function InputMultipleDataScore() {
  const initialMatch = { homeTeam: "", awayTeam: "", homeScore: 0, awayScore: 0 };

  // data form yang sudah di-add
  const [matchData, setMatchData] = useState([]);

  // data form yang paling bawah yang belum di-add
  const [match, setMatch] = useState(initialMatch);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allClassments = useSelector((state) => classmentSelectors.selectAll(state));

  // data form keseluruhan termasuk yang belum di-add
  const [matchFormRows, setMatchFormRows] = useState([...matchData, initialMatch]);

  useEffect(() => {
    dispatch(getClassments());
  }, [dispatch]);

  const handleInputChange = (event, rowNum) => {
    const { name, value } = event.target;
    setMatch({ ...match, [name]: value });
    const rows = [...matchFormRows];
    rows[rowNum][name] = value;
    setMatchFormRows(rows);
  };

  // Validasi data pertandingan tidak boleh sama
  const handleDuplicate = () => {
    const isMatchExist = match.homeTeam === match.awayTeam;
    if (isMatchExist) {
      toast.error("Tim yang bertanding tidak boleh sama atau dikosongkan!");
      return true;
    }
    setMatchData([...matchData, match]);
    setMatch(initialMatch);
    setMatchFormRows([...matchData, match, initialMatch]);
    return false;
  };

  const handleEmpty = () => {
    // Validasi data jika nama klub tidak diisi
    const isEmpty = match.homeTeam === "" || match.awayTeam === "";
    if (isEmpty) {
      toast.error("Maaf nama klub wajib diisi!");
      return true;
    }
  };

  const handleAddMatch = () => {
    // Validasi data pertandingan tidak boleh sama
    if (handleDuplicate()) {
      return true;
    }
    if (handleEmpty()) {
      return true;
    }
    toast.success("Data berhasil ditambahkan.");
    return false;
  };

  // Jika menang + 3 poin, jika seri masing-masing +1 poin, jika kalah + 0 poin
  const handleCalculatePoints = (homeScore, awayScore) => {
    if (homeScore > awayScore) {
      return { homePoints: 3, awayPoints: 0 };
    } else if (homeScore < awayScore) {
      return { homePoints: 0, awayPoints: 3 };
    } else {
      return { homePoints: 1, awayPoints: 1 };
    }
  };

  const handleValidateMatch = () => {
    // Validasi setiap pertandingan
    matchData.map((data) => {
      const { homeScore, awayScore } = data;
      const { homePoints, awayPoints } = handleCalculatePoints(homeScore, awayScore);
      return { ...data, homePoints, awayPoints };
    });
  };

  const handleSaveMatch = async () => {
    if (handleDuplicate()) {
      return true;
    }

    if (handleEmpty()) {
      return true;
    }

    handleValidateMatch();

    for (let i = 0; i < matchData.length; i++) {
      const currentMatch = matchData[i];
      // Proses simpan ke database
      await dispatch(updateClassment({ ...currentMatch }));
    }
    toast.success("Data berhasil disimpan.");
    setTimeout(() => {
      navigate("/");
    }, 2000);
    return false;
  };

  return (
    <div className="bg-blue-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Input Multi Skor</h1>
      <div className="flex flex-col mb-4">
        {matchFormRows.map((matchFormRow, idx) => (
          <div className={`flex items-center pb-1 pt-1${idx != matchFormRows.length - 1 ? " bg-green-300" : ""}`} key={idx}>
            <label htmlFor="homeTeam" className="mr-2">
              Tim A:
            </label>
            <select id="homeTeam" name="homeTeam" value={matchFormRows[idx]?.homeTeam} onChange={(e) => handleInputChange(e, idx)} className="px-2 py-1 rounded-md border border-gray-300">
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
            <label htmlFor="awayTeam" className="ml-2 mr-2">
              Tim B:
            </label>
            <select id="awayTeam" name="awayTeam" value={matchFormRows[idx]?.awayTeam} onChange={(e) => handleInputChange(e, idx)} className="px-2 py-1 rounded-md border border-gray-300">
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
            <input type="number" id="homeScore" name="homeScore" value={matchFormRows[idx]?.homeScore} onChange={(e) => handleInputChange(e, idx)} className="px-2 py-1 rounded-md border border-gray-300" />
            <label htmlFor="awayScore" className="ml-2 mr-2">
              Skor B:
            </label>
            <input type="number" id="awayScore" name="awayScore" value={matchFormRows[idx]?.awayScore} onChange={(e) => handleInputChange(e, idx)} className="px-2 py-1 rounded-md border border-gray-300" />
          </div>
        ))}
      </div>
      <div className="flex mb-4">
        <button className="px-4 py-2 mr-4 rounded-md bg-blue-500 text-white hover:bg-blue-600" onClick={handleAddMatch}>
          Tambah
        </button>
        <button className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600" onClick={handleSaveMatch}>
          Simpan
        </button>
      </div>
    </div>
  );
}
