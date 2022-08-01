import React from "react";
import DashNavBar from "../Dashboard/Components/Dash-NavBar/Dash-NavBar";
//import MyAdoption from "../Dashboard/Components/MyAdoptions/Components/MyAdoption/MyAdoption";
import DashFavorites from "../Dashboard/Components/MyFavorites/DashFavorites";
import "./Dashboard.css";

function Navbar() {
  return (
    <>
      <DashNavBar />
      <div className="DashcontainerMain">
        {/* <MyAdoption /> */}
        <DashFavorites />
      </div>
    </>
  );
}

export default Navbar;
