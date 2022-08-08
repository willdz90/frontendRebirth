import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DashNavBar from "../../Dashboard/Components/Dash-NavBar/Dash-NavBar";
import { getUsers, makeAdmin } from "../../Redux/Actions";
import UserDetail from "../UserDetail/UserDetail";


export default function Admins() {
    const {mail} = useParams()
  const dispatch = useDispatch()
  const users = useSelector(s => s.user)
  const admins = users.filter((a) => a.isAdmin === true && a.userName !== "RebirthApp")
  
console.log('admins', admins)
  console.log('user', users)


    useEffect(() =>{
        dispatch(getUsers())
    }, [])
  
    function handleDeleteAdmin(e){
        e.preventDefault()
        dispatch(makeAdmin(e.target.id))
            window.history.go()
        }
    
    
  return (
    <div>
        <DashNavBar/>
        <div>
        { 
            admins && admins.map((u) =>
                <UserDetail
                    handleDeleteAdmin={handleDeleteAdmin}
                    name={u.name}
                    lastName={u.lastName}
                    mail={u.mail}
                    image={u.image}
                    userName={u.userName}
                />)
        }
        </div> 
    </div>
  );
}




