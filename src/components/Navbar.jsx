import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-gray-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-around h-16">
          <div className="flex items-center">
            <div className="ml-4">
              <div className="flex items-baseline space-x-4">
                <Link to="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Lihat Info Klasmen
                </Link>
                <Link to="/input-data-club" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Input Data Klub
                </Link>
                <Link to="/input-score-single" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Input Satu Pertandingan
                </Link>
                <Link to="/input-score-multi" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Input Banyak Pertandingan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
