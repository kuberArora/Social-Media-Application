import React, { useEffect, useState } from "react";

import firebase from "../../config/fbConfig";

const DisplayComment = ({ uniqueKey }) => {
    const [commentList, setCommentList] = useState();

    useEffect(() => {
        const commentRef = firebase.database().ref(`Posts/${uniqueKey}/comments`);
        commentRef.on('value', (snapshot) => {
            const commentData = snapshot.val();
            const commentList = [];

            for (let data in commentData) {
                commentList.push(commentData[data]);
            }
            setCommentList(commentList);
        });
    }, []);

    return (
        <div>
            {commentList ? commentList.map((commentlist) => (
                <div class="ui comments">
                    <div class="comment">
                        <a class="avatar">
                            <img src={commentlist.photoURL} />
                        </a>
                        <div class="content">
                            <a class="author">{commentlist.displayName}</a>
                            <div class="metadata">
                                <span class="date">{commentlist.createdAt}</span>
                            </div>
                            <div class="text">
                                {commentlist.comment}
                            </div>
                        </div>
                    </div>
                </div>

            )) : ''}
        </div>
    )
}

export default DisplayComment;