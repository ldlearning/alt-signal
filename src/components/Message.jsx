import React, {useContext, useEffect, useRef} from "react";
import {AuthContext} from "../context/AuthContext";
import {ChatContext} from "../context/ChatContext";

const Message = ({message}) => {
    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({behavior: "smooth"});
    }, [message]);

    function getFormatedDate(secondsToAdd, locale) {
        let now = new Date();
        var date = new Date(1970, 0, 1);
        date.setSeconds(secondsToAdd);

        let difference = now.getTime() - date.getTime();
        let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
        let totalSeconds = Math.ceil(difference / (1000)) - 3600;

        if (totalDays > 7) {
            return date.toLocaleDateString(locale, {
                weekday: 'long',
                month: 'long',
                day: "2-digit",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
            });
        } else if (totalDays > 1) {
            return date.toLocaleDateString(locale, {
                weekday: 'long',
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
            });
        } else if (totalSeconds > 15) {
            return date.getHours() + 1 + ':' + date.getMinutes() + ':' + date.getSeconds();
        } else {
            return "Just now";
        }
    }

    return (
        <div
            ref={ref}
            className={`message ${message.senderId === currentUser.uid && "owner"}`}
        >
            <div className="messageInfo">
                <img
                    src={
                        message.senderId === currentUser.uid
                            ? currentUser.photoURL
                            : data.user.photoURL
                    }
                    alt=""
                />
                <span>{getFormatedDate(message.date.seconds, "fr-FR")}</span>
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt=""/>}
            </div>
        </div>
    );
};

export default Message;