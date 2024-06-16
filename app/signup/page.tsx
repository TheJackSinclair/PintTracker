'use client'

import {Panel} from "@/app/Components/Panel";
import React, {useState} from "react";
import {signUp} from "@/app/firebase/firebaseUtils";
import {useAuth} from "@/app/AuthProvider";
import {doc, setDoc} from "firebase/firestore";
import {db} from "@/app/firebase/firebase-config";
import {serverTimestamp} from "@firebase/firestore";


export default function Home() {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState('');
    const {currentUser, loading} = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    {
        currentUser ? window.location.href = '/' : null
    }

    const handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault();
        const userCredential = await signUp(email, password);
        if (userCredential) {
            const usersCollectionRef = doc(db, "users", email);
            await setDoc(usersCollectionRef, {
                email: email,
                username: username,
                memberSince: serverTimestamp(),
                added: [],
                addedYou: [],
                totalPints: 0
            });
            console.log("User created successfully:", userCredential.user);
            window.location.href = '/'
        } else {
            setErrorMessage('Failed to create an account. Please check the provided details and try again.');
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 p-12">
            <Panel width={'medium'} shadow={'orange'}>
                <p className={'text-pt-brown text-4xl font-bold'}>Sign Up</p>
                <form className={'block space-y-5'} onSubmit={handleSignUp}>
                    <div>
                        <input type="text" id="email"
                               className="border text-gray-900 text-sm rounded-lg w-full p-4"
                               placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
                               required/>
                    </div>
                    <div>
                        <input type="text" id="username"
                               className="border text-gray-900 text-sm rounded-lg w-full p-4"
                               placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}
                               required/>
                    </div>
                    <div>
                        <input type="password" id="password"
                               className="border text-gray-900 text-sm rounded-lg w-full p-4"
                               placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
                               required/>
                    </div>
                    <div>
                        <input type="password" id="passconfirm"
                               className="border text-gray-900 text-sm rounded-lg w-full p-4"
                               placeholder="Re-Confirm Password" value={confirmPassword}
                               onChange={e => setConfirmPassword(e.target.value)}
                               required/>
                    </div>
                    <button className="bg-pt-red text-pt-offwhite font-bold rounded-2xl max-h-[4rem] p-4 min-w-full"
                            type={'submit'}>
                        Sign Up
                    </button>
                    {errorMessage &&
                        <p className="border text-pt-red text-center font-bold rounded-2xl">{errorMessage}</p>}
                </form>
            </Panel>
        </main>
    )
}
