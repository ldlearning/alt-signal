import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

// const currentUser = {
//     photoUrl : "",
//     displayName : "Dan Leduc",
//
// }
function NavBar(props) {

    const {currentUser} = useContext(AuthContext)
    return (
        <div className='navbar'>
            <span className="logo">Alt Signal</span>
            <div className="user">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={()=>signOut(auth)}>logout</button>
            </div>
        </div>
    );
}

export default NavBar;