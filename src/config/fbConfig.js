import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAcIdG5Ida8HXbl0keu7IGANTT6lCcI-ao",
    authDomain: "social-media-app-1526a.firebaseapp.com",
    projectId: "social-media-app-1526a",
    storageBucket: "social-media-app-1526a.appspot.com",
    messagingSenderId: "407597031143",
    appId: "1:407597031143:web:44d366046a79d9b1924c42",
    measurementId: "G-7RNRMNHW51"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// const db=firebase.firestore();
// const auth=firebase.auth

export default firebase;