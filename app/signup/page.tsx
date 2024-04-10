'use client'

import {Panel} from "@/app/Components/Panel";
import {FormEvent, useState} from "react";

export default function Home() {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const data = {username, password};

        if (confirmPassword != password) {
            setMessage('Passwords do not match.')
            return;
        }

        fetch('/api/account/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json().then(data => ({
                status: response.status,
                body: data
            })))
            .then(obj => {
                if (obj.status === 200) {
                    setMessage(obj.body.message); // Adjust based on your API response
                    window.location.href = '/login';
                } else {
                    throw new Error(obj.body.error || 'Failed to create account');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setErrorMessage(error.message);
            });
    };


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Panel width={'medium'} shadow={'orange'}>
                <p className={'text-pt-brown text-4xl font-bold'}>Sign Up</p>
                <form onSubmit={handleSubmit} className={'block space-y-5'}>
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
                            type={'submit'} onClick={handleSubmit}>
                        Sign Up
                    </button>
                    {errorMessage && <p className="border text-pt-red text-center font-bold rounded-2xl">{errorMessage}</p>}
                </form>
            </Panel>
        </main>
    )
}
