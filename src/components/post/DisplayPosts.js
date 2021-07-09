import React, { useEffect, useState } from "react";

import firebase from "../../config/fbConfig";
import Accordion from "./Accordion";

const DisplayPosts = () => {
    const [postsList, setPostsList] = useState();
    const [uniqueKey, setUniqueKey] = useState();
    const [isActive, setIsActive] = useState(false);

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
                postsList.push(postData[data]);
            }
            setPostsList(postsList);
        });
    }, []);

    return (
        <div className="ui container">
            <div >
                <div style={{ marginLeft: "120px", marginTop: "60px" }}>
                    {postsList ? postsList.map((postlist, index) => (
                            <div className="ui feed" style={{marginTop:"20px",marginBottom:"30px"}}>
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
                                <Accordion uniqueKey={uniqueKey[index]} />
                            </div>
                    )) : ''}
                </div>
            </div>
        </div>
    );
}

export default DisplayPosts;