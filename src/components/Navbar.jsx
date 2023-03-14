import { useState } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="bg-gray-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-around h-16">
          <div className="flex items-center">
            <div className="ml-4">
              <div className="flex items-baseline space-x-4">
                <Link to="/" className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-medium">
                  Klasemen
                </Link>
                <Link to="/input-data-club" className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-medium">
                  Input Data Klub
                </Link>
                <Button aria-owns={anchorEl ? "simple-menu" : undefined} aria-haspopup="true" onMouseEnter={handleOpen}>
                  <Typography variant="button" className="text-gray-700 px-3 py-2 rounded-md text-medium" style={{ textTransform: "capitalize", fontSize: "17px" }}>
                    Input Skor
                  </Typography>
                </Button>
                <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} onMouseLeave={handleClose}>
                  <MenuItem component={Link} to="/input-score-single" onClick={handleClose} className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-medium">
                    Input Satu Pertandingan
                  </MenuItem>
                  <MenuItem component={Link} to="/input-score-multi" onClick={handleClose} className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-medium">
                    Input Banyak Pertandingan
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
