import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Moment from "moment";

import firebase from "../../config/fbConfig";


const LikePost = ({ uniqueKey }) => {
    const [likeCheck, setLikeCheck] = useState([]);
    const [likeUID, setLikeUID] = useState([]);
    const [uniqueLikeKey, setUniqueLikeKey] = useState();
    const profile = useSelector((state) => state);
    const userData = profile.firebase.auth.uid;

    const [likeData, setLikeData] = useState('');

    useEffect(() => {
        const likeCheck = firebase.database().ref(`Posts/${uniqueKey}/likes`);
        likeCheck.on('value', (snapshot) => {
            const likeData = snapshot.val();
            const likeList = [];

            setLikeData(likeData);
            for (let data in likeData) {
                likeList.push(likeData[data]);
            }
            setLikeCheck(likeList);
        });

    }, []);

    const countLike = (e) => {
        e.preventDefault();
        if (likeCheck.includes(userData)) {
            const key = Object.keys(likeData).find(key=>likeData[key]===userData); 
            firebase.database().ref(`Posts/${uniqueKey}/likes/${key}`).remove();
            console.log("printing keey ", key);
        }
        else {
            const likeNew = userData;
            const likeRef = firebase.database().ref(`Posts/${uniqueKey}/likes`).push();
            likeRef.set(likeNew);
        }
    }

    return (
        <form className="ui form" onClick={countLike}>
            <FormControlLabel
                control={<Checkbox icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    name="checkedH" />}
            />
            {likeCheck.length}
        </form>
    );
}

export default LikePost;