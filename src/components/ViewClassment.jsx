import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classmentSelectors, getClassments } from "../features/classmentSlice";

export default function ViewClassment() {
  const classments = useSelector(classmentSelectors.selectAll);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClassments());
  }, [dispatch]);

  return (
    <div className="bg-blue-50 py-6 px-4">
      <h2 className="text-2xl font-semibold mb-4">Detail Klasemen</h2>
      <div className="bg-white shadow-md overflow-hidden rounded-md">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-100 text-blue-800 uppercase">
              <th className="py-2 px-4">No</th>
              <th className="py-2 px-4">Klub</th>
              <th className="py-2 px-4">Ma</th>
              <th className="py-2 px-4">Me</th>
              <th className="py-2 px-4">S</th>
              <th className="py-2 px-4">K</th>
              <th className="py-2 px-4">GM</th>
              <th className="py-2 px-4">GK</th>
              <th className="py-2 px-4">Point</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {classments
              .sort((a, b) => {
                // sorting berdasarkan poin, jumlah bermain, jumlah gol dan jumlah kebobolan
                return (
                  b.point - a.point || // poin lebih besar
                  a.ma - b.ma || // jumlah main lebih sedikit
                  b.gm - a.gm || // jumlah gol lebih banyak
                  a.gk - b.gk
                ); // jumlah kebobolan lebih sedikit
              })
              .map((club, index) => (
                <tr key={index} className="hover:bg-blue-50">
                  <td className="py-2 px-4">{index + 1}.</td>
                  <td className="py-2 px-4">{club.name}</td>
                  <td className="py-2 px-4">{club.ma}</td>
                  <td className="py-2 px-4">{club.me}</td>
                  <td className="py-2 px-4">{club.s}</td>
                  <td className="py-2 px-4">{club.k}</td>
                  <td className="py-2 px-4">{club.gm}</td>
                  <td className="py-2 px-4">{club.gk}</td>
                  <td className="py-2 px-4">{club.point}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
