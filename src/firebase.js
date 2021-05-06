import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCF_Wh--kzuGN_bT1FuFyYqc48OWltMQPw",
    authDomain: "drexter-f23c0.firebaseapp.com",
    projectId: "drexter-f23c0",
    storageBucket: "drexter-f23c0.appspot.com",
    messagingSenderId: "364655238159",
    appId: "1:364655238159:web:d6d31ce62ff1db0505d77a",
    measurementId: "G-PL6C9F7TPN"
};

firebase.initializeApp(firebaseConfig);

firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject);
    })
};

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function () { })
    .catch(function (error) {
        console.log(error.code);
        console.log(error.message);
    });

const db = firebase.firestore();
const storage = firebase.storage();

export {
    db,
    firebase,
    storage
};