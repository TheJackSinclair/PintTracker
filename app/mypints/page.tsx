"use client";

import React, { useState, useEffect } from 'react';
import Carousel from '../Components/Carousel';
import { Panel } from '../Components/Panel'
import { AnalyticsChart } from '../Components/AnalyticsChart';
import {fetchUsername, fetchUserToken} from '../Common/UserCommon'
import { SwiperSlide } from 'swiper/react';
import AnalyticsCard from '../Components/AnalyticsCard';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import axios from 'axios';

export default function MyPints() {
  const [username, setUsername] = useState<string | null>(null);
  const [pintsLastWeek, setPintsLastWeek] = useState([]);
  const [favPint, setFavPint] = useState(null);
  const [strongestPint, setStrongestPint] = useState({name: null, abv: null});
  const [numPintsDrank, setNumPintsDrank] = useState(null);
  const [dayMostDrank, setDayMostDrank] = useState({day: null, pints_drank: null});

  // this is like onMounted() in vuejs
    useEffect(() => {
        const fetchTokenAndUsername = async () => {
            const token = fetchUserToken();
            if (!token) {
                window.location.href = '/login';
            } else {
                const usernameToken = fetchUsername(token);
                setUsername(usernameToken);
            }
        };

        fetchTokenAndUsername();
    }, []);

    useEffect(() => {
        console.log('Username' && username)
        if (username !== null) {
            console.log(username);
            fetchAnalytics();
            fetchPintsLastWeek();
        }
    }, [username]);

  const fetchAnalytics = async () => {
      fetch('/api/analytics/' + username)
          .then(response => response.json())
          .then(data => {
              console.log('Response Data', data);
              const analytics = data['user_statistics'];
              setFavPint(analytics['favourite_pint']);
              setNumPintsDrank(analytics['total_pints_drank']);
              setDayMostDrank(analytics['most_drank_day']);
              setStrongestPint(analytics['strongest_pint_drank']);
          })
          .catch(error => console.error('Error fetching data:', error));
  };

  const fetchPintsLastWeek = async () => {
    try {
        axios.get('/api/analytics/last_week/' + username).then((response) => {
          setPintsLastWeek(response.data['pints_per_day']);
        });
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  return (
    <main className="min-h-screen p-10">
      {username ? (
        <div className="my-5 flex flex-col">
          <p className="text-pt-brown text-center text-6xl font-extrabold drop-shadow-2xl stat-info-main">Here's your analytics, {username}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <div className='flex mb-16'>
        <Carousel> 
          <SwiperSlide>
            <AnalyticsCard>
                <h1 className="text-pt-brown text-3xl font-extrabold drop-shadow-2xl" >Your favourite pint is...</h1>
                <h1 className="mt-6 mb-6 text-pt-brown text-5xl font-extrabold stat-info-main">{favPint}</h1>
                <h1 className='text-5xl'>🍻</h1>
                <p className="text-pt-brown italic bottom-0 absolute mb-2">... cheers to that</p>
            </AnalyticsCard>
            </SwiperSlide>
            <SwiperSlide>
            <AnalyticsCard>
                <h1 className="text-pt-brown text-3xl font-extrabold drop-shadow-2xl" >You've drank...</h1>
                <h1 className="mt-6 mb-6 text-pt-brown text-5xl font-extrabold stat-info-main">{numPintsDrank} pints</h1>
                <h1 className='mt-6 mb-6 text-pt-brown text-xl font-extrabold stat-info-main'>since you've joined 🍻</h1>
                <p className="text-pt-brown italic bottom-0 absolute mb-2">... impressive!</p>
            </AnalyticsCard>
            </SwiperSlide>
            <SwiperSlide>
            <AnalyticsCard>
                <h1 className="text-pt-brown text-3xl font-extrabold drop-shadow-2xl" >Your Strongest pint is...</h1>
                <h1 className="mt-6 mb-6 text-pt-brown text-5xl font-extrabold stat-info-main">{strongestPint.name}</h1>
                <h1 className='mt-6 mb-6 text-pt-brown text-xl font-extrabold stat-info-main'>@ {strongestPint.abv}% a.b.v 🥊</h1>
                <p className="text-pt-brown italic bottom-0 absolute mb-2">... ooft</p>
            </AnalyticsCard>
            </SwiperSlide>
            <SwiperSlide>
            <AnalyticsCard>
                <h1 className="text-pt-brown text-3xl font-extrabold drop-shadow-2xl" >Your drank the most pints on...</h1>
                <h1 className="mt-6 mb-6 text-pt-brown text-4xl font-extrabold stat-info-main break-words">{dayMostDrank.day}</h1>
                <h1 className='text-5xl'>📆</h1>
                <h1 className='mt-6 mb-6 text-pt-brown text-xl font-extrabold stat-info-main'>with {dayMostDrank.pints_drank} pints put away</h1>
                <p className="text-pt-brown italic bottom-0 absolute mb-2">... save the date!</p>
            </AnalyticsCard>
            </SwiperSlide>
        </Carousel>
      </div>

      <Panel width={"large"} shadow={"orange"} centered={true}>
          <h5 className="mt-2 text-5xl font-bold tracking-tight dark:text-white text-pt-brown">Your weekly pints:</h5>
          <AnalyticsChart weeklyPintHistory={pintsLastWeek}/>
        </Panel>

    </main>
  );
}