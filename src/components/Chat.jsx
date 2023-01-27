import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
    const { data } = useContext(ChatContext);

    console.log(data);
    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                {/*<span>displayName</span>*/}
                <div className="chatIcons">
                    <img src={"/assets/cam.png"} alt="" />
                    <img src={"/assets/add.png"} alt="" />
                    <img src={"/assets/more.png"} alt="" />
                </div>
            </div>
            <Messages />
            <Input/>
        </div>
    );
};

export default Chat;