import React, { useState } from "react";

export default function InputSingleDataScore() {
  const [matchData, setMatchData] = useState([]);
  const [match, setMatch] = useState({ homeTeam: "", awayTeam: "", homeScore: 0, awayScore: 0 });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMatch({ ...match, [name]: value });
  };

  return (
    <div>
      <h1>Single Input Score</h1>
    </div>
  );
}
