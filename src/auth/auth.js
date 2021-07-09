import firebase from "../config/fbConfig";

const socialMediaAuth=(provider)=>{
    return firebase.auth().signInWithPopup(provider).then((res)=>{
        return res.user;
    }).catch((err)=>{
        return err;
    })

}

export default socialMediaAuth;