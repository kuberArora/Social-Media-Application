import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useHistory, Redirect } from "react-router-dom";
import {
    Jumbotron,
    Spinner,
    Button,
} from "reactstrap";
import Moment from "moment";
import firebase from "../../config/fbConfig";

const RoomList = () => {
    const auth = useSelector((state) => state.firebase.auth);
    const [room, setRoom] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const nickname = auth.displayName;
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            await firebase
                .database()
                .ref("rooms/")
                .on("value", (resp) => {
                    setRoom([]);
                    setRoom(snapshotToArray(resp));
                    setShowLoading(false);
                });
        };

        fetchData();
    }, []);

    const snapshotToArray = (snapshot) => {
        const returnArr = [];

        snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });

        return returnArr;
    };

    const enterChatRoom = (roomname) => {
        const chat = {
            roomname: "",
            nickname: "",
            message: "",
            date: "",
            type: "",
        };
        chat.roomname = roomname;
        chat.nickname = nickname;
        chat.date = Moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
        chat.message = `${nickname} enter the room`;
        chat.type = "join";
        const newMessage = firebase.database().ref("chats/").push();
        newMessage.set(chat);

        firebase
            .database()
            .ref("roomusers/")
            .orderByChild("roomname")
            .equalTo(roomname)
            .on("value", (resp) => {
                let roomuser = [];
                roomuser = snapshotToArray(resp);
                const user = roomuser.find((x) => x.nickname === nickname);
                if (user !== undefined) {
                    const userRef = firebase.database().ref("roomusers/" + user.key);
                    userRef.update({ status: "online" });
                } else {
                    const newroomuser = { roomname: "", nickname: "", status: "" };
                    newroomuser.roomname = roomname;
                    newroomuser.nickname = nickname;
                    newroomuser.status = "online";
                    const newRoomUser = firebase.database().ref("roomusers/").push();
                    newRoomUser.set(newroomuser);
                }
            });

        history.push("/chatroom/" + roomname);
    };

    if (!auth.uid) return <Redirect to='/' />

    return (
        <div>
            {showLoading && <Spinner color="primary" />}
            <Jumbotron className="roomlistJumbotron">
                <h2>My Friends</h2>
                <div className="ui items">
                    {room.map((item, idx) => (
                        <div className="item" key={idx} action onClick={() => { enterChatRoom(item.roomname); }} >
                            <div class="ui tiny image">
                                <img src="./img/download.jpg" />
                            </div>
                            <div class="middle aligned content">
                                <a class="header"><Button style={{ width: "100%" }}>{item.roomname}</Button></a>
                            </div>
                        </div>
                    ))}
                </div>
            </Jumbotron>
        </div>
    );
}

export default RoomList;
