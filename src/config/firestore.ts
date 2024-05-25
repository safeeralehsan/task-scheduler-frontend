import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyCCqo-sdXNCdt3At6eWjZ1tsJNQ7QVnakw",
    authDomain: "schedule-tasks-4deb0.firebaseapp.com",
    projectId: "schedule-tasks-4deb0",
    storageBucket: "schedule-tasks-4deb0.appspot.com",
    messagingSenderId: "412564794028",
    appId: "1:412564794028:web:03e071f325f6a9b3cb0d09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const firestoreDB = getFirestore(app);