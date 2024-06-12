import firebase from "firebase/compat";

export interface UserData {
    email: string;
    username: string;
    added?: string[];
    addedYou?: string[];
    totalPints: number;
    memberSince: firebase.firestore.Timestamp;
}