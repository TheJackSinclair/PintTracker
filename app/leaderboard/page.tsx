"use client";

import React, {useState, useEffect} from 'react';
import {LeaderboardPanel} from '../Components/LeaderboardPanel'
import { useAuth, useFetchFriendsList} from "@/app/Common/UserCommon";
import axios from 'axios';

type Friend = {
    name: string;
    pints_drank: number;
};

export default function Leaderboard() {
    const [friendsData, setFriendsData] = useState<Friend[]>([]);
    const [selTab, setSelTab] = useState<string>('Lifetime');

    const {username, token} = useAuth()

    const {friends} = useFetchFriendsList(token)

    const fetchFriendData = async (friend: string, endpoint: string): Promise<Friend> => {
        const response = await axios.get(`/api/analytics/${endpoint}/${friend}`);
        const pints_drank = response.data['pints_per_day'].reduce((total: number, current: number) => total + current, 0);
        return {
            name: friend,
            pints_drank,
        };
    };

    const fetchLifetimeData = async (friend: string): Promise<Friend> => {
        const response = await fetch(`/api/analytics/${friend}`);
        const data = await response.json();
        return {
            name: friend,
            pints_drank: data['user_statistics']['total_pints_drank'],
        };
    };

    const sortData = (data: Friend[]) => data.sort((a, b) => b.pints_drank - a.pints_drank);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataPromises = friends.map(friend => {
                    switch (selTab.toLowerCase()) {
                        case 'lifetime':
                            return fetchLifetimeData(friend.toString());
                        case 'monthly':
                            return fetchFriendData(friend.toString(), 'last_month');
                        default:
                            return fetchFriendData(friend.toString(), 'last_week');
                    }
                });

                const data = await Promise.all(dataPromises);
                setFriendsData(sortData(data));
            } catch (error) {
                console.error('Error fetching analytics data:', error);
            }
        };

        fetchData();
    }, [friends, selTab]);


    const handleTabClick = (tab: string) => {
        setSelTab(tab);
        console.log(tab)
    };

    return (
        <main className="min-h-screen p-16">
            {username ? (
                <div className="m-2 flex ">
                    <LeaderboardPanel onTabClick={handleTabClick}>
                        <div className="h-max">
                            <h5 className="md:text-5xl font-bold tracking-tight dark:text-white text-pt-brown break-words">{selTab} Leaderboard</h5>
                        </div>
                        <div className="mt-4">
                            {friends[0] ?
                                <table className='w-full'>
                                <thead>
                                <tr>
                                    <th className='w-1/4 text-left text-pt-brown'>Rank</th>
                                    <th className='w-1/3 text-left text-pt-brown'>Name</th>
                                    <th className='w-1/3 text-center text-pt-brown'>Pints Drank</th>
                                </tr>
                                </thead>
                                <tbody>
                                { friendsData.map((friend, index) => (
                                    <tr key={index}>
                                        <td className="text-pt-brown font-extrabold md:text-lg">{index + 1}</td>
                                        <td className="text-pt-brown font-extrabold md:text-lg">{friend.name}</td>
                                        <td className="text-pt-brown font-extrabold md:text-lg text-center">{friend.pints_drank ? friend.pints_drank : 0}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                                : <h5 className="md:text-2xl font-bold tracking-tight dark:text-white text-pt-brown break-words">You dont have any friends, what are you? an alcoholic?</h5>}
                        </div>
                    </LeaderboardPanel>
                </div>
            ) : (
                <p>Loading...</p>
            )}

        </main>
    );
}