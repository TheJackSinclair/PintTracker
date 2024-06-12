import {auth, db} from './firebase-config';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential} from "firebase/auth";
import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    increment,
    query,
    setDoc,
    updateDoc
} from "firebase/firestore";
import {serverTimestamp} from "@firebase/firestore";
import {BeerData, PintEntry} from "@/app/Common/BeerCommon";
import {UserData} from "@/app/Common/UserCommon";

// Function to sign in
export const signIn = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error signing in: ", error);
        return null;
    }
};

// Function to sign out
export const signOutUser = async () => {
    try {
        await signOut(auth);
        console.log("Signed out successfully");
    } catch (error) {
        console.error("Error signing out: ", error);
    }
};

// Function to sign up a new user
export const signUp = async (email: string, password: string): Promise<UserCredential | null> => {
    try {
        return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("Error signing up:", error);
        return null;
    }
};

export async function getUserDataById(userId: string): Promise<UserData | null> {
    try {
        if (userId) {
            const docSnap = await getDoc(doc(db, "users", userId));

            if (docSnap.exists()) {
                // Extract data and ensure it matches the UserData interface
                const data = docSnap.data();
                return {
                    email: data.email,
                    username: data.username,
                    added: data.added,
                    addedYou: data.addedYou,
                    totalPints: data.totalPints,
                    memberSince: data.memberSince
                };
            } else {
                console.log("No user found with ID:", userId);
                return null;
            }
        } else {
            return null
        }
    } catch (error) {
        console.error("Error fetching user data:", error, userId);
        return null;
    }
}

export async function addPintToHistory(email: string, pint: BeerData) {
    const userRef = doc(db, "users", email);
    const pintHistoryRef = collection(userRef, "pint_history");
    const pintRef = doc(pintHistoryRef);

    await setDoc(pintRef, {
        timestamp: serverTimestamp(),  // Should be Firestore Timestamp for better querying
        name: pint.name,
        full_name: pint.beer_name_full,
        abv: pint.abv,
        style: pint.style
    });

    await updateDoc(userRef, {totalPints: increment(1)})
}

export async function getUserPints(email: string): Promise<PintEntry[]> {
    const userRef = doc(db, "users", email);
    const pintHistoryRef = collection(userRef, "pint_history");
    const pintQuery = query(pintHistoryRef);  // You might want to add sorting or limits here

    try {
        const querySnapshot = await getDocs(pintQuery);
        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                timestamp: data.timestamp ? data.timestamp.toDate() : new Date(), // Convert Firestore Timestamp to Date
                name: data.name,
                full_name: data.full_name,
                abv: data.abv,
                style: data.style
            };
        });
    } catch (error) {
        console.error("Failed to fetch pint history:", error);
        throw new Error("Failed to fetch pint history.");
    }
}

export async function addFriend(selfEmail: string, friendEmail: string): Promise<void> {
    const userRef = doc(db, "users", selfEmail);
    const friendRef = doc(db, "users", friendEmail);

    try {

        await updateDoc(userRef, {
            added: arrayUnion(friendEmail)
        });

        await updateDoc(friendRef, {
            addedYou: arrayUnion(selfEmail)
        });

    } catch (error) {
        console.error("Error in adding friend or updating 'addedYou':", error);
    }
}

export async function removeFriend(selfEmail: string, friendEmail: string): Promise<void> {
    const userRef = doc(db, "users", selfEmail);
    const friendRef = doc(db, "users", friendEmail);

    try {

        await updateDoc(userRef, {
            added: arrayRemove(friendEmail)
        });

        await updateDoc(friendRef, {
            addedYou: arrayRemove(selfEmail)
        });

    } catch (error) {
        console.error("Error in adding friend or updating 'addedYou':", error);
    }
}
