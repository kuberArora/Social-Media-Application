import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";


import PostForm from "./PostForm";
import DisplayPosts from "./DisplayPosts";

const Post = () => {

    const profile = useSelector((state) => state);
    const userData = profile.firebase.auth.uid;

    if (!userData) {
        return (
            <Redirect to='/' />
        )
    }

    return (
        <div className="ui grid" style={{ marginTop: "5px" }}>
            <PostForm />
            <DisplayPosts />
        </div>
    );
}

export default Post;