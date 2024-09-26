'use client'

import {Panel} from "@/app/Components/Panel";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {Modal} from "@/app/Components/Modal";
import {addFriend, getUserDataById, removeFriend, signOutUser} from "@/app/firebase/firebaseUtils";
import {useAuth} from "@/app/AuthProvider";
import {UserData} from "@/app/Common/UserCommon";

export default function Home() {
    const {currentUser, loading} = useAuth();
    const [showFriendModel, setShowFriendModel] = useState(false);
    const [friendsData, setFriendsData] = useState<UserData[]>([]);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [friend, setFriend] = useState<string>('');
    const [lastTap, setLastTap] = useState<number>(0);

    const email = currentUser?.email ?? ''

    useEffect(() => {
        getUserDataById(email).then(setUserData);
    }, [email]);

    {
        !currentUser && !loading ? window.location.href = '/login' : null
    }

    const fetchFriendsData = async () => {
        if (userData?.added && userData.added.length > 0) {
            try {
                const fetchPromises = userData.added.map(id => getUserDataById(id));
                const results = await Promise.all(fetchPromises);
                const filteredResults: UserData[] = results.filter((data): data is UserData => data !== null);
                setFriendsData(filteredResults);
            } catch (error) {
                console.error('Failed to fetch friend data:', error);
            }
        }
    };

    const handleDoubleTap = async (event: React.TouchEvent<HTMLLIElement>, friendEmail: string): Promise<void> => {
        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;
        if (lastTap && (now - lastTap) < DOUBLE_TAP_DELAY) {
            try {
                await removeFriend(email, friendEmail);
                alert(`Friend ${friendEmail} removed successfully.`);
            } catch (error: any) {
                console.error('Error removing friend:', error);
            }
        }
        setLastTap(now);
        window.location.reload()
    };

    useEffect(() => {
        fetchFriendsData();
    }, [userData?.added])

    const handleFriendSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email && friend) {
            console.log("Attempting to add friend:", friend);
            addFriend(email, friend);
        } else {
            console.log("Email or friend is missing.");
        }
    };

    const handleRemoveFriend = async (friendEmail: string) => {
        console.log(friendEmail)
        try {
            await removeFriend(email, friendEmail);
            alert(`Removed ${friendEmail} from friends.`);
            window.location.reload()
        } catch (error) {
            console.error('Failed to remove friend:', error);
        }
    };

    const handleShowFriendModel = () => {
        setShowFriendModel(true);
    };

    const handleCloseFriendModal = () => {
        setShowFriendModel(false)
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 p-10">
            <Panel width={'medium'} shadow={'yellow'}>
                <h1 className="font-bold text-pt-brown text-6xl mb-6 drop-shadow-[2px_2px_var(--tw-shadow-color)] text-center text-[3rem]">{userData?.username}</h1>

                <div className={'grid grid-cols-8 grid-rows-1 gap-3 '}>
                    <Image src={'/pencil.svg'} alt={'Pencil Icon'} width={35} height={35}
                           className={'justify-self-end col-span-1 '}/>
                    <button
                        className={'rounded-2xl border-2 max-h-10 min-w-[10rem] col-span-7 border-pt-brown text-pt-brown'}>Edit
                        Profile
                    </button>
                </div>
                <div className={'grid grid-cols-8 grid-rows-1 gap-3 '}>
                    <Image src={'/friend.svg'} alt={'Pencil Icon'} width={35} height={35}
                           className={'justify-self-end col-span-1'}/>
                    <button
                        className={'rounded-2xl border-2 max-h-10 min-w-[10rem] col-span-7 border-pt-brown text-pt-brown'}
                        onClick={handleShowFriendModel}>Friends
                    </button>
                </div>
                <a className={'grid grid-cols-8 grid-rows-1 gap-3 '} href={'mypints'}>
                    <Image src={'/userPint.svg'} alt={'Pencil Icon'} width={35} height={35}
                           className={'justify-self-end col-span-1'}/>
                    <button
                        className={'rounded-2xl border-2 max-h-10 min-w-[10rem] col-span-7 border-pt-brown text-pt-brown'}>My
                        Pints
                    </button>
                </a>
                {userData?.email == 'admin@admin.com' ? <div className={'grid grid-cols-8 grid-rows-1 gap-3 '}>
                    <Image src={'/admin.svg'} alt={'Pencil Icon'} width={35} height={35}
                           className={'justify-self-end col-span-1'}/>
                    <button
                        className={'rounded-2xl border-2 max-h-10 min-w-[10rem] col-span-7 border-pt-brown text-pt-brown'}>Admin
                        Panel
                    </button>
                </div> : ''}
                <div className={'grid grid-cols-8 grid-rows-1 gap-3 '}>
                    <Image src={'/logout.svg'} alt={'Pencil Icon'} width={35} height={35}
                           className={'justify-self-end col-span-1'}/>
                    <button
                        className={'rounded-2xl border-2 max-h-10 min-w-[10rem] col-span-7 border-pt-brown text-pt-brown'}
                        onClick={signOutUser}>Logout
                    </button>
                </div>

            </Panel>

            {showFriendModel &&
                <Modal width={'medium'} onClose={handleCloseFriendModal}>
                    <h1 className="font-bold text-pt-brown text-2xl lg:text-6xl  drop-shadow-[2px_2px_var(--tw-shadow-color)] text-center">Friends</h1>
                    <h1 className="font-bold text-pt-brown text-xs lg:text-sm  drop-shadow-[2px_2px_var(--tw-shadow-color)] text-center">Double
                        Click to Remove a Friend</h1>

                    <ul>
                        {friendsData.map((friend) => (
                            <li className={'rounded-2xl border-2 max-h-[2.5rem] border-pt-brown text-pt-brown text-center text-2xl my-5 hover:text-pt-red hover:border-pt-red'}
                                key={friend.username} onDoubleClick={() => handleRemoveFriend(friend.email)}
                                onTouchEnd={(e) => handleDoubleTap(e, friend.username)}>
                                {friend.username}
                            </li>
                        ))}
                    </ul>

                    <form className={'self-end mb-4 m-auto'} onSubmit={handleFriendSubmit}>
                        <input
                            type="email"
                            id="friend"
                            className="border text-gray-900 text-sm rounded-lg p-4 mr-4 mb-2"
                            placeholder="Enter Friends Email"
                            value={friend}
                            onChange={e => setFriend(e.target.value)}
                            required
                        />
                        <button
                            className="bg-pt-blue text-pt-offwhite font-bold rounded-2xl max-h-[4rem] p-4"
                            type={'submit'}
                        >
                            Add Friend
                        </button>
                    </form>
                </Modal>
            }
        </main>
    )
}
