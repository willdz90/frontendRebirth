import React from "react";
import MessageBoard from "../MessageBoard/MessageBoard";
import Menu from '../../../../../Assets/Messageboard/menu.svg'
import LateralBar from "./LateralBar";
import './AdoptionRequest.css'
import AcceptReject from "../Accept-Reject/Accept-Reject";

export default function AdoptionRequest() {
    function SideBar(){
    let Sidebar=document.getElementById("sidebar")
    Sidebar.classList.toggle("hidden-sidebar")
    Sidebar.classList.toggle("hidden-sidebar2")
    }
  return (
    <>
    <div className="menu-div">
    <img src={Menu} onClick={()=>SideBar()}/>
    </div>
    <div className="adoption-request">
        
       
      <div  id="sidebar" className="lateralbar hidden-sidebar2">
        <LateralBar />
      </div>
      
      <div className="message-accept-reject">
      <div className="messageboard">
        <MessageBoard/>
      </div>
      <div className="accept-reject">
       <AcceptReject/>
    </div>
      </div>
      </div>
      
    </>
  );
}
