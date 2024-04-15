'use client'

import {Panel} from "@/app/Components/Panel";
import {useState} from "react";

export default function Home() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Login failed');
            }

            const data = await response.json();
            const token = (data.access_token).toString()
            localStorage.setItem('pint_token', token)
            window.location.href= '/';
        } catch (error: any) {
            setError(error.message || 'An error occurred');
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Panel width={'medium'} shadow={'yellow'}>
                <p className={'text-pt-brown text-4xl font-bold'}>Sign In</p>
                <form onSubmit={handleLogin} className={'block space-y-5'}>
                    <div>
                        <input type="text"
                               className="border text-gray-900 text-sm rounded-lg w-full p-4"
                               placeholder="Username"
                               onChange={(e) => setUsername(e.target.value)} required/>
                    </div>
                    <div>
                        <input type="password"
                               className="border text-gray-900 text-sm rounded-lg w-full p-4"
                               placeholder="Password"
                               onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    {error && <p className="border text-pt-red text-center font-bold rounded-2xl">{error}</p>}
                    <button className="bg-pt-red text-pt-offwhite font-bold rounded-2xl max-h-[4rem] p-4 min-w-full" type={'submit'} onClick={handleLogin}>
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
