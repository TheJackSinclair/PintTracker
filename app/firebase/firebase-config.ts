import {initializeApp} from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB9TvnvscyP-D-XhxSyFHQnkDSkE4nPuEw",
    authDomain: "pinttracker.firebaseapp.com",
    projectId: "pinttracker",
    storageBucket: "pinttracker.appspot.com",
    messagingSenderId: "621342967544",
    appId: "1:621342967544:web:cfe5b36eabb2f784959d0d",
    measurementId: "G-72F677Q19P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)