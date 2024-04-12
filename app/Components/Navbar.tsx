'use client'

import Image from "next/image";
import {fetchUserToken} from "@/app/Common/UserCommon";


const NavBar = () => {

    const textDecider = () => {
        const token = fetchUserToken();
        if (!token) {
            return 'login'
        }
        return 'logout'

    }

    const logout = async () => {
        localStorage.removeItem('pint_token');
        window.location.reload();
    }

    return (
        <nav
            className={"bg-pt-yellow shadow-lg min-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-3"}>
            <a href="/homepage">
                <Image src={'/lightLogo.svg'} alt={'Pintlogo'} height={175} width={175} className={'drop-shadow-text'}/>
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
                <button className="bg-pt-red text-pt-offwhite font-bold rounded-2xl max-h-[4rem] p-4 justify-end"
                        onClick={logout}>logout</button>) : (
                <a href="/login">
                <button className="bg-pt-red text-pt-offwhite font-bold rounded-2xl max-h-[4rem] p-4 justify-end">login</button>
                </a>)}

        </nav>)
}

export {NavBar}