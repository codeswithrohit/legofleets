
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAYrp8S3uEalC5fbLULdmxaYz7dkquEKAs",
  authDomain: "legofleetsss.firebaseapp.com",
  projectId: "legofleetsss",
  storageBucket: "legofleetsss.appspot.com",
  messagingSenderId: "527578388157",
  appId: "1:527578388157:web:2f3a648bf6d7f62272c9d4"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }

