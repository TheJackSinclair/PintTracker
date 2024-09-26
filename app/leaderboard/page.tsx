"use client";

import React, {useState, useEffect} from 'react';
import {LeaderboardPanel} from '../Components/LeaderboardPanel'
import {useAuth} from "@/app/AuthProvider";
import {getUserDataById} from "@/app/firebase/firebaseUtils";
import {fetchFriendsPintData, UserData, UserWithPintData} from "@/app/Common/UserCommon";
import {Loading} from "@/app/Components/Loading";


export default function Leaderboard() {
    const [friendsData, setFriendsData] = useState<UserWithPintData[]>([]);
    const [selTab, setSelTab] = useState<string>('Lifetime');
    const {currentUser, loading} = useAuth();
    const [userData, setUserData] = useState<UserData | null>(null);

    const email = currentUser?.email ?? ''


    useEffect(() => {
        getUserDataById(email).then(setUserData);
    }, [email]);

    useEffect(() => {
        fetchFriendsPintData(userData, setFriendsData);
    }, [userData?.added])

    if (loading) {
        return <Loading/>;
    }

    {
        !currentUser ? window.location.href = '/login' : null
    }

    const handleTabClick = (tab: string) => {
        setSelTab(tab);
    };

    return (
        <main className="lg:flex lg:m-auto lg:p-16 p-4 lg:w-1/3">
            <div className="m-2 flex ">
                <LeaderboardPanel onTabClick={handleTabClick} shadow={'orange'}>
                    {(selTab) => (
                        <div className="h-max">
                            <h5 className="md:text-5xl text-center text-3xl font-bold tracking-tight dark:text-white text-pt-brown break-words ">
                                {selTab} Leaderboard
                            </h5>
                            <div className="mt-4">
                                {friendsData && friendsData.length > 0 ? (
                                    <table className='w-full'>
                                        <thead>
                                        <tr>
                                            <th className='w-1/4 text-left text-pt-brown text-md text-lg'>Rank</th>
                                            <th className='w-1/3 text-left text-pt-brown text-lg'>Name</th>
                                            <th className='w-1/3 text-center text-pt-brown text-lg'>Pints Drank</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {friendsData.map((friend: UserWithPintData, index) => {
                                            let pintsDrank = 0;
                                            if (selTab === 'Weekly') {
                                                pintsDrank = friend.weeklyPints;
                                                console.log(friend.weeklyPints)
                                            } else if (selTab === 'Monthly') {
                                                pintsDrank = friend.monthlyPints;
                                                console.log(friend.monthlyPints)
                                            } else if (selTab === 'Lifetime') {
                                                pintsDrank = friend.lifetimePints;
                                                console.log(friend.lifetimePints)
                                            }

                                            return (
                                                <tr key={index}>
                                                    <td className="text-pt-brown font-extrabold text-lg">{index + 1}</td>
                                                    <td className="text-pt-brown font-extrabold text-lg">{friend.username}</td>
                                                    <td className="text-pt-brown font-extrabold text-lg text-center">{pintsDrank || 0}</td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </table>
                                ) : (
                                    <h5 className="md:text-2xl font-bold tracking-tight dark:text-white text-pt-brown break-words">
                                        You don't have any friends, what are you? an alcoholic?
                                    </h5>
                                )}
                            </div>
                        </div>
                    )}
                </LeaderboardPanel>
            </div>
        </main>
    );
}