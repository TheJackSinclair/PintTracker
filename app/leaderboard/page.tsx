"use client";

import React, {useState, useEffect} from 'react';
import {LeaderboardPanel} from '../Components/LeaderboardPanel'
import {useAuth} from "@/app/AuthProvider";
import {getUserDataById} from "@/app/firebase/firebaseUtils";
import {UserData} from "@/app/Common/UserCommon";

export default function Leaderboard() {
    const [friendsData, setFriendsData] = useState<UserData[]>([]);
    const [selTab, setSelTab] = useState<string>('Lifetime');
    const {currentUser, loading} = useAuth();
    const [userData, setUserData] = useState<UserData | null>(null);

    const email = currentUser?.email ?? ''

    const fetchFriendsData = async () => {
        if (userData?.added && userData.added.length > 0) {
            try {
                // Map each ID to a fetch operation
                const fetchPromises = userData.added.map(id => getUserDataById(id));

                // Wait for all fetch operations to complete
                const results = await Promise.all(fetchPromises);

                // Update state with all fetched data
                // Explicitly filter out nulls and assert the remaining as UserData[]
                const filteredResults: UserData[] = results.filter((data): data is UserData => data !== null);
                setFriendsData(filteredResults);
            } catch (error) {
                console.error('Failed to fetch friend data:', error);
            }
        }
    };

    useEffect(() => {
        getUserDataById(email).then(setUserData);
    }, [email]);

    useEffect(() => {
        fetchFriendsData();
    }, [userData?.added])

    if (loading) {
        return <div>Loading...</div>;
    }

    {
        !currentUser ? window.location.href = '/login' : null
    }

    const handleTabClick = (tab: string) => {
        setSelTab(tab);
    };

    return (
        <main className="lg:flex lg:m-auto lg:p-16 p-8 lg:w-1/3">
            {/*<div className="m-2 flex ">*/}
            <LeaderboardPanel onTabClick={handleTabClick}>
                <div className="h-max">
                    <h5 className="md:text-5xl font-bold tracking-tight dark:text-white text-pt-brown break-words ">{selTab} Leaderboard</h5>
                </div>
                <div className="mt-4">
                    {friendsData ?
                        <table className='w-full'>
                            <thead>
                            <tr>
                                <th className='w-1/4 text-left text-pt-brown'>Rank</th>
                                <th className='w-1/3 text-left text-pt-brown'>Name</th>
                                <th className='w-1/3 text-center text-pt-brown'>Pints Drank</th>
                            </tr>
                            </thead>
                            <tbody>
                            {friendsData.map((friend, index) => (
                                <tr key={index}>
                                    <td className="text-pt-brown font-extrabold md:text-lg">{index + 1}</td>
                                    <td className="text-pt-brown font-extrabold md:text-lg">{friend.username}</td>
                                    <td className="text-pt-brown font-extrabold md:text-lg text-center">{friend.totalPints ? friend.totalPints : 0}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        :
                        <h5 className="md:text-2xl font-bold tracking-tight dark:text-white text-pt-brown break-words">You
                            dont have any friends, what are you? an alcoholic?</h5>}
                </div>
            </LeaderboardPanel>
            {/*</div>*/}
        </main>
    );
}