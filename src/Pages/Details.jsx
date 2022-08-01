import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getDetails, postMercadoPago } from "../Redux/Actions/index";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import "./Details.css";
import female from "../Assets/Female_ico_big.png";
import male from "../Assets/male-icon.png";
import dogIco from "../Assets/dog_ico_big.png";
import weight from "../Assets/weight_ico_big.png";
// import swal from "sweetalert";

function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { name, image, race, age, size, gender, description, location } = useSelector(
    (state) => state.detail
  );
  
  let user = null;
  if(localStorage.length !== 0){
    const userJson = localStorage.getItem("user");
    user = JSON.parse(userJson);
  }

  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  // function clear() {
  //   dispatch(resetDetails());
  // }

  // function handleDelete() {
  //   dispatch(deletePet(id));
  //   navigate("/home");
  // }
  
  return (
    <div>
      <Navbar />
      <Container>
        <Header />
        <br />
        <div className="dtl-card">
          <div className="dtl-cardLeft">
            <h3 className="title">{name}</h3>
            <h4 className="breed">{race}</h4>
            <h5 className="age">{age}&nbsp;years</h5>
            <span className="petlocation">{location}</span>
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
              <img src={dogIco} alt="Pet" />
            </div>
            <div className="txt-description-last">
              <span>3.4 kg</span>
              <img src={weight} alt="weight" />
            </div>
            <Link to={user!== null ? `/donations/${id}` : `/login`} >
            <button className="a-btn" >
              <span>Donate</span>
            </button>
            </Link>
            <button className="b-btn">
              <span>Adopt me!</span>
            </button>
          </div>

          <div className="dtl-cardRight">
            <div className="img-dtl">
              <div className="a-btnFav"></div>
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
