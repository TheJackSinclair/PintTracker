'use client'

import {Panel} from "@/app/Components/Panel";
import Image from "next/image";
import React, {FormEvent, useState} from "react";
import {
    useAuth,
    useFetchFriendsList
} from "@/app/Common/UserCommon";
import {Modal} from "@/app/Components/Modal";

export default function Home() {

    const [showFriendModel, setShowFriendModel] = useState(false);

    const [showDeleteModel, setShowDeleteModel] = useState(false);

    const {username, token} = useAuth()

    let { friends, fetchFriends } = useFetchFriendsList(token)

    const [friend, setFriend] = useState<string>('');

    const handleFriendSubmit = (event: FormEvent) => {
        event.preventDefault();

        // Assuming 'friend' is a variable in the scope that contains the name of the friend to add
        const url = `/api/friends/add/${encodeURIComponent(friend)}`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                fetchFriends()
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleDeleteSubmit = (event: FormEvent) => {
        event.preventDefault();

        const url = username ? `/api/account/delete/${encodeURIComponent(username)}` : `/api/account/delete/`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                logout().then(r => console.log('delete success', r))
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleShowFriendModel = () => {
        setShowFriendModel(true);
    };

    const handleCloseFriendModal = () => {
        setShowFriendModel(false)
    };

    const handleShowDeleteModel = () => {
        setShowDeleteModel(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModel(false)
    };

    const logout = async () => {
        localStorage.removeItem('pint_token');
        window.location.reload();
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Panel width={'medium'} shadow={'yellow'}>
                <h1 className="font-bold text-pt-brown text-6xl mb-6 drop-shadow-[2px_2px_var(--tw-shadow-color)] text-center text-[3rem]">{username}</h1>

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
                {username == 'admin' ? <div className={'grid grid-cols-8 grid-rows-1 gap-3 '}>
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
                        onClick={logout}>Logout
                    </button>
                </div>
                <div className={'grid grid-cols-8 grid-rows-1 gap-3 '}>
                    <Image src={'/delete.svg'} alt={'Pencil Icon'} width={35} height={35}
                           className={'justify-self-end col-span-1'}/>
                    <button
                        className={'rounded-2xl border-2 max-h-10 min-w-[10rem] col-span-7 border-pt-brown text-pt-brown'} onClick={handleShowDeleteModel}>Delete
                        Account
                    </button>
                </div>

            </Panel>

            {showFriendModel &&
                <Modal width={'medium'} onClose={handleCloseFriendModal}>
                    <h1 className="font-bold text-pt-brown text-2xl lg:text-6xl  drop-shadow-[2px_2px_var(--tw-shadow-color)] text-center">Friends</h1>

                    {friends.map(friend => (
                        <ul>
                            <li
                                className={'rounded-2xl border-2 max-h-[2.5rem] border-pt-brown text-pt-brown text-center text-2xl my-5'}
                                key={friend.toString()}>{friend}</li>
                        </ul>
                    ))}

                    <form className={'self-end mb-4'} onSubmit={handleFriendSubmit}>
                        <input type="text" id="friend"
                               className="border text-gray-900 text-sm rounded-lg w-2/3 p-4 mr-4 mb-2"
                               placeholder="Add Friend" value={friend} onChange={e => setFriend(e.target.value)}
                               required/>
                        <button className="bg-pt-blue text-pt-offwhite font-bold rounded-2xl max-h-[4rem] p-4"
                                type={'submit'} onClick={handleFriendSubmit}>Add Friend
                        </button>
                    </form>
                </Modal>
            }

            {showDeleteModel &&
                <Modal width={'medium'} onClose={handleCloseDeleteModal}>
                    <h1 className="font-bold text-pt-brown text-2xl lg:text-6xl  drop-shadow-[2px_2px_var(--tw-shadow-color)] text-center">Delete Account</h1>

                    <form className={'self-end mb-4'} onSubmit={handleDeleteSubmit}>
                        <button className="bg-pt-red text-pt-offwhite font-bold rounded-2xl p-4 min-w-full"
                                type={'submit'} onClick={handleDeleteSubmit}>Delete Account
                        </button>
                    </form>
                </Modal>
            }
        </main>
    )
}
