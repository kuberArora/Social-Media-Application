import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import firebase from "../../config/fbConfig";

const DisplayPosts = () => {
    const [postsList, setPostsList] = useState();
    const [uniqueKey, setUniqueKey] = useState();

    const profile = useSelector((state) => state);
    const userData = profile.firebase.auth;


    useEffect(() => {
        const postRef = firebase.database().ref("Posts");
        postRef.on('value', (snapshot) => {
            const postData = snapshot.val();
            const postsList = [];

            if (postData !== null) {
                const key = Object.keys(postData);
                setUniqueKey(key);
            }

            for (let data in postData) {
                if (userData.uid === postData[data].uid) {
                    postsList.push(postData[data]);
                }
            }
            setPostsList(postsList);
        });
    }, []);

    
    
    return (
        <div className="ui container">
            <div >
                <div style={{ marginLeft: "120px", marginTop: "60px" }}>
                    {postsList ? postsList.map((postlist, index) => (
                        <div className="ui feed" style={{ marginTop: "20px", marginBottom: "30px" }}>
                            <div className="event">
                                <div className="label">
                                    <img src={postlist.photoURL} />
                                </div>
                                <div className="content">
                                    <div className="summary">{postlist.displayName}</div>
                                    <div className="ui vertical segment">
                                        <p>{postlist.post}</p>
                                    </div>
                                    <div className="extra images">
                                        <img src={postlist.postImage} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : ''}
                </div>
            </div>
        </div>
    );
}

export default DisplayPosts;