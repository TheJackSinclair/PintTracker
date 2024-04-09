"use client";

import React, { useState, useEffect, use } from 'react';
import Carousel from '../Components/Carousel';
import { Panel } from '../Components/Panel'
import { AnalyticsChart } from '../Components/AnalyticsChart';
import { fetchUsername } from '../Common/UserCommon'
import axios from 'axios';

export default function MyPints() {
  const [username, setUsername] = useState<string | null>(null);
  const [weeklyPintHistory, setWeeklyPintHistory] = useState([]);

  // this is like onMounted() in vuejs
  useEffect(() => {
    let usernameFromLocalStorage = fetchUsername();
    // Update the state only if the name is not null
    if (usernameFromLocalStorage !== null) {
      setUsername(usernameFromLocalStorage);
    }

    fetchWeeklyPintHistory();
  }, []);

  const fetchWeeklyPintHistory = async () => {
    try {
        const response = await axios.get('/api/pinthistory', {params: {timeframe: 'weekly', token: localStorage.getItem('user_token')}});
        setWeeklyPintHistory(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  return (
    <main className="min-h-screen p-10">
      {username ? (
        <div className="my-5 flex flex-col">
          <p className="text-pt-brown text-center text-6xl font-extrabold drop-shadow-2xl">Here's your analytics, {username}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      
      {/* <Carousel /> */}
      
      <Panel width={"large"} shadow={"orange"} centered={true}>
        <h5 className="mb-2 text-5xl font-bold tracking-tight dark:text-white text-pt-brown">Your weekly pints 🍻</h5>
        <AnalyticsChart weeklyPintHistory={weeklyPintHistory}/>
      </Panel>

    </main>
  );
}