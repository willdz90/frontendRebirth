import React from "react";
import CarouselFade from "../Carousel/Carousel";
import { NavLink, Link } from "react-router-dom";
import headerImageTeam from "../../Assets/Header-images/botCat.png";
import headerDogTeam from '../../Assets/Header-images/btonDog.png';
import headerImageDonation from "../../Assets/Header-images/btnDonate.png";
import "./Header.css";

function Header({type}) {

  let user = null;

  if(localStorage.length !== 0){
    const userJson = localStorage.getItem("user");
    user = JSON.parse(userJson);
  }

  return (
    <React.Fragment>
      <div className="header-container">
        <div className="header-carousel">
          <CarouselFade />
        </div>
        <div className="header-buttons">
          <div className="header-team">
              {
                type === 'cat' ?
                <Link to ={'/home?type=dog'} >
                  <img className="marginImage" src={headerDogTeam} alt="botonTeam" />
                </Link>
                :
                <Link to ={'/home?type=cat'}>
                  <img src={headerImageTeam} alt="botonTeam" />
                </Link>

              }
          </div>
          <div className="header-donations">
            <NavLink to={user!== null ? "/donations" : "/login"}>
              <img src={headerImageDonation} alt="botonTeam" />
            </NavLink>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Header;
