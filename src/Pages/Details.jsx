import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams, NavLink } from "react-router-dom";
import {
  addFavs,
  deleteFavs,
  getDetails,
  resetDetails,
  getUserId,
  postMercadoPago,
} from "../Redux/Actions/index";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Header2 from "../Components/HeaderBan/Header2";
import "./Details.css";
import female from "../Assets/Female_ico_big.png";
import male from "../Assets/male-icon.png";
import dogIco from "../Assets/dog_ico_big.png";
import catIco from "../Assets/ico-cat-gris.png";

function Details() {

  window.scroll({
    top : 0,
  })
  const { id } = useParams();
  const dispatch = useDispatch();
  const [favFilters, setFavFilters] = useState([]);
  const favoritos = useSelector((state) => state.favorite);
  let favFilter =
    favoritos.length > 0 ? favoritos.filter((f) => f == id) : null;

  const pets = useSelector((store) => store.pets);

  const types = pets.map((p) => (p.type === "dog" ? "dog" : "cat"));
  console.log("id :>> ", id);

  useEffect(() => {
    setFavFilters(favFilter);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    name,
    image,
    race,
    age,
    size,
    gender,
    description,
    location,
    userMail,
    type,
  } = useSelector((state) => state.detail);

  let user = null;
  if (localStorage.length !== 0) {
    const userJson = localStorage.getItem("user");
    user = JSON.parse(userJson);
  }
  if(user){
    var mail = user.mail
  }

  console.log('user', user)

  useEffect(() => {
    dispatch(getDetails(id));
    if (user) {
      dispatch(getUserId(mail));
    }
  }, [dispatch, id]);

  
  function handleFavorite(){
    dispatch(addFavs(mail, id))
  }
  function handleDeleteFav(){
      dispatch(deleteFavs(mail, id))
  }

  return (
    <div>
      <Navbar />
      <Container>
        <Header2 />
        <br />
        <div className="dtl-card">
          <div className="dtl-cardLeft">
            {/* <button>
            <Link to={"/home?type=" + types[0]} className="link-navbar"/>
            </button> */}
            <h3 className="title">{name}</h3>
            <h4 className="breed">{race}</h4>
            <h5 className="age">{age}&nbsp;years</h5>
            <span className="petlocation">{location}</span>
            {
              user && (user.isAdmin === true)?
              <Link to={"/users"}>
              <span className="petlocation">User: {userMail}</span> 
              </Link> : null
            }
            <br />
            <div className="story-dtl">
              <h5 className="txt-dscp">{description}</h5>
            </div>
          </div>
          <div className="dtl-cardCenter">
            <h3 className="disp">AVAILABLE</h3>

            <div className="txt-description">
              <span>{gender}</span>
              {gender === "male" ? (
                <img src={male} alt="gender" />
              ) : (
                <img src={female} alt="gender" />
              )}
            </div>

            <br />

            <div className="txt-description">
              <span>{size}</span>
              {type=== "cat" ? (
                <img src={catIco} alt="type" />
              ) : (
                <img src={dogIco} alt="type" />
              )}
            </div>


                { user && (user.isAdmin === true)? null :
                 ( mail === userMail) ? null :
              <Link to={user!== null ? `/donations/${id}` : `/login`} >
                <button className="a-btn" >
                  <span>Donate</span>
                </button>
              </Link>
              }
                { user && (user.isAdmin === true)? null :
                ( mail === userMail) ? null :
                <Link to={user!== null ? `/adoption/${id}` : `/login`} >
                <button className="b-btn">
                
                  <span>Adopt me!</span>
                </button>
                </Link>
              }
          </div>

          <div className="dtl-cardRight">
            <div className="img-dtl">
              <div>
                {user && (user.isAdmin === true)? null :
                user && mail === userMail ? null : favFilter &&
                  favFilter.length !== 0 ? (
                  <>
                    <button
                      className="a-btnFavEliminar"
                      onClick={handleDeleteFav}
                    />
                  </>
                ) : (
                  <>
                    {" "}
                    <button className="a-btnFav" onClick={handleFavorite} />
                  </>
                )}
              </div>
              <img src={image} alt="Pet" className="img" />
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Details;
