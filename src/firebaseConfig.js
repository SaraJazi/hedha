import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyA_78UnwDLNX2uFtEbVzWJSAHEfhjRTJoQ",
    authDomain: "bibliotheque-49926.firebaseapp.com",
    databaseURL: "https://bibliotheque-49926.firebaseio.com",
    projectId: "bibliotheque-49926",
    storageBucket: "bibliotheque-49926.appspot.com",
    messagingSenderId: "943426648066"
};

firebase.initializeApp(config);

export default firebase;