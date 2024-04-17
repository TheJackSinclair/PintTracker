import React, {FormEvent, useState} from 'react';
import {Account} from "@/app/Common/UserCommon";
import {FriendPanel} from "@/app/Components/FriendPanel";

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    token: string | null;
    friends: Account[];
}

const Modal: React.FC<ModalProps> = ({isOpen, closeModal, token, friends}) => {
    if (!isOpen) return null;

    const [friend, setFriend] = useState<string>('');
    const handleSubmit = (event: FormEvent) => {
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
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="fixed inset-0 h-full w-full" id="my-modal">
            <div className="relative top-8 mx-auto w-1/3 rounded-md">
                <FriendPanel width={'extralarge'} shadow={'yellow'}>
                    <h1 className="font-bold text-pt-brown text-2xl lg:text-6xl  drop-shadow-[2px_2px_var(--tw-shadow-color)] text-center">Friends</h1>

                    {friends.map(friend => (
                        <div
                            className={'rounded-2xl border-2 max-h-[2.5rem] border-pt-brown text-pt-brown text-center text-2xl'}
                            key={friend}>{friend}</div>
                    ))}


                    <div className={'block self-end'}>
                        <form className={'self-end mb-4'} onSubmit={handleSubmit}>
                            <input type="text" id="friend"
                                   className="border text-gray-900 text-sm rounded-lg w-2/3 p-4 mr-4"
                                   placeholder="Add Friend" value={friend} onChange={e => setFriend(e.target.value)}
                                   required/>
                            <button className="bg-pt-blue text-pt-offwhite font-bold rounded-2xl max-h-[4rem] p-4"
                                    type={'submit'} onClick={handleSubmit}>Add Friend
                            </button>
                        </form>
                        <button
                            className="bg-pt-red text-pt-offwhite font-bold rounded-2xl max-h-[4rem] p-4 justify-end self-end"
                            onClick={closeModal}>Close Popup
                        </button>
                    </div>

                </FriendPanel>
            </div>
        </div>
    );
};

export default Modal;