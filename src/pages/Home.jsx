import React from 'react';
import SideBar from "../components/SideBar";
import Chat from "../components/Chat";

function Home(props) {
    return (
        <div className={"home"}>
            <div className={"container"}>
                <SideBar></SideBar>
                <Chat></Chat>

            </div>
        </div>
    );
}

export default Home;