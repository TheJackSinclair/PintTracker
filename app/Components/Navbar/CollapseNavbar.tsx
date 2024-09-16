'use client'

import {useState} from 'react';
import Image from "next/image";
import {useAuth} from "@/app/AuthProvider";
import {signOutUser} from "@/app/firebase/firebaseUtils";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const textDecider = () => {
        const {currentUser} = useAuth();
        if (!currentUser) {
            return 'login'
        }
        return 'logout'

    }

    return (
        <div>
            <div
                className={`fixed top-0 left-0 h-screen bg-pt-yellow text-white transition-transform duration-300 ease-in-out z-50 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } w-32`}
            >
                <div className=" flex justify-between items-center">
                    <button onClick={toggleSidebar} className="mx-auto fill-pt-yellow">
                        <Image src={'/sidebar.svg'} alt={'Pintlogo'} height={45} width={45}/>
                    </button>
                </div>
                <nav className=" mx-auto items-center text-center">
                    <a href="/">
                        <p className={'text-pt-beige p-4 font-semibold hover:underline decoration-2 drop-shadow-text'}>Home</p>
                    </a>
                    <a href="/usercentre">
                        <p className={'text-pt-beige p-4 font-semibold hover:underline decoration-2 drop-shadow-text'}>User
                            Centre</p>
                    </a>
                    <a href="/mypints">
                        <p className={'text-pt-beige p-4 font-semibold hover:underline decoration-2 drop-shadow-text'}>MyPints</p>
                    </a>
                    <a href="/leaderboard">
                        <p className={'text-pt-beige p-4 font-semibold hover:underline decoration-2 drop-shadow-text'}>Leaderboard</p>
                    </a>

                    {textDecider() == 'logout' ? (
                        <button className="bg-pt-red text-pt-offwhite font-bold rounded-2xl max-h-[4rem] p-4 mx-auto"
                                onClick={signOutUser}>Logout</button>) : (
                        <>
                            <a href="/login">
                                <p className='text-pt-beige p-4 font-semibold hover:underline decoration-2 drop-shadow-text rounded-3xl bg-pt-red'>Login</p>
                            </a>
                            <p className={'text-pt-black p-4 text-center underline'}>*You must
                                login before accessing the website*</p>
                        </>
                    )}
                </nav>

            </div>

            <div
                className={'fixed top-0 left-0 h-screen  text-white '}>
                {!isOpen ? (<button onClick={toggleSidebar}>
                    <Image src={'/sidebar.svg'} alt={'Pintlogo'} height={35} width={35}/>
                </button>) : ''}
            </div>

        </div>
    );
};

export {Sidebar};
