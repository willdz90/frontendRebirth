import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../../Components/Navbar/Navbar';
import { Widget } from "@uploadcare/react-widget";
import { updateUser } from "../../../Redux/Actions/index";
import "./Profile.css";
import DashNavBar from '../Dash-NavBar/Dash-NavBar';
import Footer from '../../../Components/Footer/Footer';

function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profileView);
  const infoStorage = localStorage.getItem("user");
  const user =
    Object.keys(profile).length !== 0 ? profile : JSON.parse(infoStorage);

  const [input, setInput] = useState({
    formBasicName: "",
    formBasicLastName: "",
    formBasicMail: "",
    formBasicPassword: "",
    formBasicImage: "",
    formBasicUserName: "",
  });

    function handleChange(e){
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

  function handleImage(file) {
    setInput({
      ...input,
      formBasicImage: `https://ucarecdn.com/${file.uuid}/`,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateUser(user.mail, input));
    setInput({
        formBasicName: "",
        formBasicLastName: "",
        formBasicMail: "",
        formBasicPassword: "",
        formBasicUserName: "",
      })
  }

  return (
  
    <div className="fixed-top">
       <DashNavBar/>
      <form method="PUT" onSubmit={(e) => handleSubmit(e)}>
        <div className="row d-flex flex-column align-items-center">
          <div className="col-md-1">
            <div className="d-flex flex-column align-items-center text-center p-3 py-2">
              <img
                className="rounded-circle mt-5 mb-4"
                alt="profileImg"
                width="75px"
                height="75px"
                src={user.image}
              />
              <Widget
                publicKey="e7afc989eff083e04496"
                value={input.formBasicImage}
                onFileSelect={(e) => {
                  e.done((file) => {
                    handleImage(file);
                  });
                }}
              />
            </div>
          </div>
          <div className="col-md-6 border-right">
            <div className="p-3">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="text-right profTitle">Profile</h2>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels profiTxt">First Name</label>
                  <input
                    id="formBasicName"
                    type="text"
                    className="form-control"
                    name="formBasicName"
                    placeholder={user.givenName ? user.givenName : user.name}
                    value={input.formBasicName}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels profiTxt">Last Name</label>
                  <input
                    id="formBasicLastName"
                    type="text"
                    className="form-control"
                    name="formBasicLastName"
                    value={input.formBasicLastName}
                    placeholder={user.lastName}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
              </div>
              <div>
                <div>
                  <label className="labels profiTxt mt-3">Username</label>
                  <input
                    id="formBasicUserName"
                    type="text"
                    className="form-control"
                    name="formBasicUserName"
                    value={input.formBasicUserName}
                    placeholder={user.userName}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels profiTxt">Email</label>
                  <input
                    id="formBasicMail"
                    name="formBasicMail"
                    type="text"
                    className="form-control"
                    placeholder={user.mail}
                    value={input.formBasicMail}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    disabled
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels profiTxt">Password</label>
                  <input
                    id="formBasicPassword"
                    name="formBasicPassword"
                    type="password"
                    className="form-control"
                    placeholder="********"
                    value={input.formBasicPassword}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <button className="btn btn-profile" type="submit">
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
        </div>
    
   
   
  );
}

export default Profile;
