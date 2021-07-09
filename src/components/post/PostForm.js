import React, { useState } from "react";
import Moment from "moment";
import { useSelector } from "react-redux";

import firebase from "../../config/fbConfig";
import ImageUploader from "./ImageUploader";

const PostForm = () => {

    const [post, setPost] = useState('');
    const [postImage, setPostImage] = useState('');
    const profile = useSelector((state) => state);
    const userData = profile.firebase.auth.uid;
    const displayName = profile.firebase.auth.displayName;
    const photoURL=profile.firebase.auth.photoURL;

    const [postData, setPostData] = useState({
        post: "",
        postImage: ""
    });

    const handleOnChange = (e) => {
        setPost(e.target.value);
    }

    const createPost = (e) => {
        e.preventDefault();
        const postNew = postData;
        postNew.post = post;
        postNew.postImage = postImage;
        postNew.uid = userData;
        postNew.displayName=displayName;
        postNew.photoURL=photoURL;
        postNew.createdAt = Moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
        const postRef = firebase.database().ref("Posts/").push();
        postRef.set(postNew);
        setPost('');
        setPostData({
            post: "",
            postImage: ""
        });
        document.getElementById("postForm").reset();
    }

    console.log("image url parent", postImage);

    return (
        <div className="ui container">
            <div style={{ marginTop: "-90px",marginLeft:"130px" }}>
                <form className="ui reply form" onSubmit={createPost} autoComplete="off" id="postForm">
                    <div className="field">
                        <textarea onChange={handleOnChange} value={post} placeholder="Share Something..." />
                    </div>
                    <div className="ui grid">
                        <div className="ten wide column"><ImageUploader onImageURL={setPostImage} /></div>
                        <div className="six wide column">
                            <div className="field" style={{ marginTop: "10px", textAlign: "end" }}>
                                <button className="ui blue labeled submit icon button" type="submit">
                                    <i className="icon edit"></i> Add Post
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostForm;