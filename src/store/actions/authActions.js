import firebase from "../../config/fbConfig";

export const signIn = (credentials) => dispatch => {
    firebase.auth().signInWithPopup(
        credentials
    ).then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
        dispatch({ type: 'LOGIN_ERROR', err });
    });
}

export const signOut=()=>{
    return(dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase();

        firebase.auth().signOut().then(()=>{
            dispatch({type:'SIGNOUT_SUCCESS'});
        });
    }
}
