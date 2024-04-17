"use client";

import React, { useState, useEffect } from 'react';
import Carousel from '../Components/Carousel';
import { LeaderboardPanel } from '../Components/LeaderboardPanel'
import {Account, fetchFriendList, fetchUsername, fetchUserToken} from "@/app/Common/UserCommon";
import axios from 'axios';

export default function Leaderboard() {
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [friends, setFriends] = useState<String[]>([]);
  const [friendsData, setFriendsData] = useState<{ name: String; pints_drank: any; }[]>([]);
  const [selTab, setSelTab] = useState<string>('Lifetime');

  // this is like onMounted() in vuejs
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

    useEffect(() => {
      if (selTab.toLowerCase() == 'lifetime') {
        Promise.all(
          friends.map((friend) =>
            axios.get('/api/analytics/' + friend).then((response) => ({
              name: friend,
              pints_drank: response.data['user_statistics']['total_pints_drank'],
            }))
          )
        )
        .then((rankings) => {
          rankings.sort((a, b) => b.pints_drank - a.pints_drank);
          setFriendsData(rankings);
        })
        .catch((error) => console.error('Error fetching analytics data:', error));
      } else if (selTab.toLowerCase() == 'monthly') {
        Promise.all(
          friends.map((friend) =>
          axios.get('/api/analytics/last_week/' + friend).then((response) => ({
              name: friend,
              pints_drank: response.data['pints_per_day'].reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0),
            }))
          )
        )
        .then((rankings) => {
          rankings.sort((a, b) => b.pints_drank - a.pints_drank);
          setFriendsData(rankings);
        })
        .catch((error) => console.error('Error fetching analytics data:', error));
      } else {
        Promise.all(
          friends.map((friend) =>
          axios.get('/api/analytics/last_month/' + friend).then((response) => ({
              name: friend,
              pints_drank: response.data['pints_per_day'].reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0),
            }))
          )
        )
        .then((rankings) => {
          rankings.sort((a, b) => b.pints_drank - a.pints_drank);
          setFriendsData(rankings);
        })
        .catch((error) => console.error('Error fetching analytics data:', error));
      }
    }, [friends, selTab]);

    const handleTabClick = (tab: string) => {
      setSelTab(tab);
      console.log(tab)
    };

  return (
    <main className="min-h-screen p-10">
      {username ? (
        <div className="my-5 flex flex-col">
          <div className='flex mb-16'>
            <LeaderboardPanel onTabClick={handleTabClick} width={"large"} shadow={"orange"}>
              <div className="h-max">
                <h5 className="text-5xl font-bold tracking-tight dark:text-white text-pt-brown break-words">Leaderboard</h5>
              </div>
              <div className="mt-4">
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
                        <td className="text-pt-brown font-extrabold text-lg">{index+1}</td>
                        <td className="text-pt-brown font-extrabold text-lg">{friend.name}</td>
                        <td className="text-pt-brown font-extrabold text-lg text-center" >{friend.pints_drank}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </LeaderboardPanel>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

    </main>
  );
}