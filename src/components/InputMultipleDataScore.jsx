import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { classmentSelectors, getClassments, updateClassment } from "../features/classmentSlice";

export default function InputMultipleDataScore() {
  const [matchData, setMatchData] = useState([]);
  const [match, setMatch] = useState({ homeTeam: "", awayTeam: "", homeScore: 0, awayScore: 0 });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const clubData = useSelector((state) => classmentSelectors.selectById(state, id));

  console.log(clubData);

  useEffect(() => {
    dispatch(getClassments());
  }, [dispatch]);

  useEffect(() => {
    if (clubData) {
      // rencana mau ambil data dari redux store untuk di cocokan per id dan data di tambahkan di id yang cocok
    }
  }, [clubData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMatch({ ...match, [name]: value });
  };

  const handleDuplicate = () => {
    // Validasi data pertandingan tidak boleh sama
    const isMatchExist = matchData.some((data) => (data.homeTeam === match.homeTeam && data.awayTeam === match.awayTeam) || (data.homeTeam === match.awayTeam && data.awayTeam === match.homeTeam));

    if (isMatchExist) {
      alert("Data pertandingan sudah ada, terdeksi duplikat");
      return true;
    }

    setMatchData([...matchData, match]);
    setMatch({ homeTeam: "", awayTeam: "", homeScore: 0, awayScore: 0 });
  };

  const handleAddMatch = () => {
    // Validasi data jika nama klub tidak diisi
    const isEmpty = match.homeTeam === "" || match.awayTeam === "";
    if (isEmpty) {
      alert("Maaf nama klub wajib diisi!");
      return true;
    }
    // Validasi data pertandingan tidak boleh sama
    if (handleDuplicate()) {
      return true;
    }
    return false;
  };

  const handleCalculatePoints = (homeScore, awayScore) => {
    // Jika menang + 3 poin, jika seri masing-masing +1 poin, jika kalah + 0 poin
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
    const validatedMatchData = matchData.map((data) => {
      const { homeScore, awayScore } = data;
      const { homePoints, awayPoints } = handleCalculatePoints(homeScore, awayScore);
      return { ...data, homePoints, awayPoints };
    });

    console.log("Data pertandingan setelah divalidasi dan disimpan:", validatedMatchData);
  };

  const handleSaveMatch = async () => {
    // Proses simpan ke database
    if (handleDuplicate()) {
      return true;
    }
    handleValidateMatch();
    await dispatch(updateClassment({ ...matchData })); // masih salah!
    navigate("/");
  };

  return (
    <div className="bg-blue-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Multiple Input Score</h1>
      <div className="flex flex-col mb-4">
        <div className="flex items-center mb-2">
          <label htmlFor="homeTeam" className="mr-2">
            Klub 1:
          </label>
          <input type="text" id="homeTeam" name="homeTeam" value={match.homeTeam} onChange={handleInputChange} className="px-2 py-1 rounded-md border border-gray-300" />
          <label htmlFor="homeScore" className="ml-2 mr-2">
            Skor 1:
          </label>
          <input type="number" id="homeScore" name="homeScore" value={match.homeScore} onChange={handleInputChange} className="px-2 py-1 rounded-md border border-gray-300" />
        </div>
        <div className="flex items-center">
          <label htmlFor="awayTeam" className="mr-2">
            Klub 2:
          </label>
          <input type="text" id="awayTeam" name="awayTeam" value={match.awayTeam} onChange={handleInputChange} className="px-2 py-1 rounded-md border border-gray-300" />
          <label htmlFor="awayScore" className="ml-2 mr-2">
            Skor 2:
          </label>
          <input type="number" id="awayScore" name="awayScore" value={match.awayScore} onChange={handleInputChange} className="px-2 py-1 rounded-md border border-gray-300" />
        </div>
      </div>
      <div className="flex mb-4">
        <button className="px-4 py-2 mr-4 rounded-md bg-blue-500 text-white hover:bg-blue-600" onClick={handleAddMatch}>
          Add
        </button>
        <button className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600" onClick={handleSaveMatch}>
          Save
        </button>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Daftar Pertandingan</h2>
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Klub 1</th>
              <th className="border border-gray-400 px-4 py-2">Skor 1</th>
              <th className="border border-gray-400 px-4 py-2">Klub 2</th>
              <th className="border border-gray-400 px-4 py-2">Skor 2</th>
            </tr>
          </thead>
          <tbody>
            {matchData.map((data, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">{data.homeTeam}</td>
                <td className="border border-gray-400 px-4 py-2">{data.homeScore}</td>
                <td className="border border-gray-400 px-4 py-2">{data.awayTeam}</td>
                <td className="border border-gray-400 px-4 py-2">{data.awayScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
