'use client'

import {Panel} from "@/app/Components/Panel";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {Account, fetchFriendList, fetchUsername, fetchUserToken} from "@/app/Common/UserCommon";
import Modal from "@/app/Components/FriendModal";

export default function Home() {
    const [username, setUsername] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [friends, setFriends] = useState<Account[]>([]);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    useEffect(() => {
        const fetchTokenAndUsername = async () => {
            const fetchedToken = await fetchUserToken(); // Ensure you await here.
            if (!fetchedToken) {
                window.location.href = '/login';
            } else {
                const usernameFromToken = await fetchUsername(fetchedToken); // Ensure you await here too.
                setUsername(usernameFromToken);
                setToken(fetchedToken);
            }
        };

        fetchTokenAndUsername();
    }, []);

    useEffect(() => {
        if (token) {
            fetchFriendList(token)
                .then(setFriends)
                .catch(console.error);
        }
    }, [token]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Panel width={'small'} shadow={'yellow'} blur={isOpen}>
          <h1 className="font-bold text-pt-brown text-6xl mb-6 drop-shadow-[2px_2px_var(--tw-shadow-color)] text-center">{username}</h1>

          <div className={'grid grid-cols-8 grid-rows-1 gap-3 '}>
            <Image src={'/pencil.svg'} alt={'Pencil Icon'} width={35} height={35} className={'justify-self-end col-span-1 '}/>
            <button className={'rounded-2xl border-2 max-h-10 min-w-[10rem] col-span-7 border-pt-brown text-pt-brown'}>Edit Profile</button>
          </div>
          <div className={'grid grid-cols-8 grid-rows-1 gap-3 '}>
              <Image src={'/friend.svg'} alt={'Pencil Icon'} width={35} height={35} className={'justify-self-end col-span-1'}/>
              <button className={'rounded-2xl border-2 max-h-10 min-w-[10rem] col-span-7 border-pt-brown text-pt-brown'} onClick={openModal}>Friends</button>
          </div>
          <div className={'grid grid-cols-8 grid-rows-1 gap-3 '}>
              <Image src={'/userPint.svg'} alt={'Pencil Icon'} width={35} height={35} className={'justify-self-end col-span-1'}/>
              <button className={'rounded-2xl border-2 max-h-10 min-w-[10rem] col-span-7 border-pt-brown text-pt-brown'}>My Pints</button>
          </div>
          <div className={'grid grid-cols-8 grid-rows-1 gap-3 '}>
              <Image src={'/admin.svg'} alt={'Pencil Icon'} width={35} height={35} className={'justify-self-end col-span-1'}/>
              <button className={'rounded-2xl border-2 max-h-10 min-w-[10rem] col-span-7 border-pt-brown text-pt-brown'}>Admin Panel</button>
          </div>
          <div className={'grid grid-cols-8 grid-rows-1 gap-3 '}>
              <Image src={'/logout.svg'} alt={'Pencil Icon'} width={35} height={35} className={'justify-self-end col-span-1'}/>
              <button className={'rounded-2xl border-2 max-h-10 min-w-[10rem] col-span-7 border-pt-brown text-pt-brown'}>Logout</button>
          </div>
          <div className={'grid grid-cols-8 grid-rows-1 gap-3 '}>
              <Image src={'/delete.svg'} alt={'Pencil Icon'} width={35} height={35} className={'justify-self-end col-span-1'} />
              <button className={'rounded-2xl border-2 max-h-10 min-w-[10rem] col-span-7 border-pt-brown text-pt-brown'}>Delete Account</button>
          </div>

      </Panel>
        <Modal isOpen={isOpen} closeModal={closeModal} token={token} friends={friends}/>
    </main>
  )
}
