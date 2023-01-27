import React, {useState} from 'react';
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth, db, storage} from "../firebase";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {doc, setDoc} from "firebase/firestore";

import { useNavigate, Link } from "react-router-dom";

function Register(props) {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);


        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                        setLoading(false);
                        setErr(false);
                    } catch (err) {
                        console.log(err);
                        setErr(true);
                        setLoading(false);
                    }
                });
            });

        } catch (err) {
            setErr(true);
            setLoading(false);
        }
    };
    return (
        <div className={"formContainer"}>
            <div className={"formWrapper"}>
                <span className={"logo"}>Alt Signal</span>
                <span className={"title"}>Register</span>
                <form onSubmit={handleSubmit}>
                    <input type={"text"} placeholder={"display name"}/>
                    <input type={"email"} placeholder={"email"}/>
                    <input type={"password"} placeholder={"password"}/>
                    <input style={{display: "none"}} type={"file"} id={"file"}/>
                    <label htmlFor={"file"}>
                        <img src={"/assets/addAvatar.png"} alt={"Avatar image"}/>
                        <span>Select a profile image</span>
                    </label>
                    <button disabled={loading}>Sign Up</button>
                    {loading && "Uploading and compressing the image please wait..."}
                    {err && <span>Something went wrong</span>}
                </form>
                <p>You do have an account? <a href={"/login"}>Login</a></p>
            </div>
        </div>
    );
}

export default Register;