'use client'

import {Panel} from "@/app/Components/Panel";
import React, {useState} from "react";
import {signIn} from "@/app/firebase/firebaseUtils";
import {useAuth} from "@/app/AuthProvider";
import {Loading} from "@/app/Components/Loading";

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {currentUser, loading} = useAuth();

    if (loading) {
        return <Loading/>;
    }

    {
        currentUser ? window.location.href = '/' : null
    }

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = await signIn(email, password);
        if (user) {
            window.location.href = '/'
        } else {
            alert("Failed to log in");
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 p-12">
            <Panel width={'medium'} shadow={'yellow'}>
                <p className={'text-pt-brown text-4xl font-bold'}>Sign In</p>
                <form className={'block space-y-5'} onSubmit={handleSignIn}>
                    <div>
                        <input type="text"
                               className="border text-gray-900 text-sm rounded-lg w-full p-4"
                               placeholder="Email"
                               onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div>
                        <input type="password"
                               className="border text-gray-900 text-sm rounded-lg w-full p-4"
                               placeholder="Password"
                               onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    
                    <button className="bg-pt-red text-pt-offwhite font-bold rounded-2xl max-h-[4rem] p-4 min-w-full"
                            type={'submit'}>
                        Sign In
                    </button>
                </form>
                <a href={'/signup'}>
                    <button className="bg-pt-red text-pt-offwhite font-bold rounded-2xl max-h-[4rem] p-4 min-w-full">
                        Sign up now
                    </button>
                </a>
            </Panel>
        </main>
    )
}
