import React, { useState } from "react";
import { useSelector } from "react-redux";
import Moment from "moment";


import firebase from "../../config/fbConfig";

const CommentPost = ({ uniqueKey,status }) => {

    const [comment, setComment] = useState('');
    const profile = useSelector((state) => state);
    const userData = profile.firebase.auth.uid;
    const photoURL = profile.firebase.auth.photoURL;
    const displayName = profile.firebase.auth.displayName;

    const [commentData, setCommentData] = useState({
        comment: ""
    });

    const createComment = (e) => {
        e.preventDefault();
        const commentNew = commentData;
        commentNew.comment = comment;
        commentNew.uid = userData;
        commentNew.photoURL = photoURL;
        commentNew.displayName=displayName;
        commentNew.createdAt = Moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
        const commentRef = firebase.database().ref(`Posts/${uniqueKey}/comments`).push();
        commentRef.set(commentNew);
        document.getElementById("commentForm").reset();
    }

    const handleOnChange = (e) => {
        setComment(e.target.value);
    }

    return (
        <div className="ui container">
            <div className="twelve wide column">
                <form className="ui form" onSubmit={createComment} autoComplete="off" id="commentForm">
                    <div className="field">
                        <input type="text" onChange={handleOnChange} />
                    </div>
                    <div className="field" style={{ marginTop: "10px" }}>
                        <button className="ui blue labeled submit icon button" type="submit">
                            <i className="icon edit"></i> Add Comment
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default CommentPost;