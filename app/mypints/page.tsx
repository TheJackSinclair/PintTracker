"use client";

import React, {useState, useEffect} from 'react';
import {Carousel} from '../Components/Carousel';
import {Panel} from '../Components/Panel'
import {AnalyticsLineChart} from "../Components/Analytics";
import {UserData} from '../Common/UserCommon'
import {SwiperSlide} from 'swiper/react';
import {AnalyticsCard} from '../Components/Analytics';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import {useAuth} from "@/app/AuthProvider";
import {getUserDataById, getUserPints} from "@/app/firebase/firebaseUtils";
import {PintEntry} from "@/app/Common/BeerCommon";
import {Loading} from "@/app/Components/Loading";
import {AnalyticsBarChart} from "@/app/Components/Analytics/AnalyticsBarChart";

function formatDate(d: Date): string {
    const pad = (num: number): string => num < 10 ? '0' + num : num.toString();
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

function findMaxPintDay(pintEntries: PintEntry[]): { date: string, count: number } | null {
    // Group and count pints by date
    const countByDate: Record<string, number> = pintEntries.reduce((acc: Record<string, number>, entry: PintEntry) => {
        const date: string = formatDate(entry.timestamp);
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    // Find the day with the most pints
    let maxDay: string | null = null;
    let maxCount: number = 0;

    Object.entries(countByDate).forEach(([date, count]) => {
        if (count > maxCount) {
            maxDay = date;
            maxCount = count;
        }
    });

    return maxDay ? {date: maxDay, count: maxCount} : null;
}

function findFavoritePint(pintEntries: PintEntry[]): PintEntry | null {
    const frequencyMap: Record<string, { count: number, entry: PintEntry }> = {};

    pintEntries.forEach(entry => {
        const key = entry.name;  // You can use 'name' or 'full_name' based on how specific you want to be
        if (frequencyMap[key]) {
            frequencyMap[key].count++;
        } else {
            frequencyMap[key] = {count: 1, entry};
        }
    });

    let favoritePint: PintEntry | null = null;
    let maxCount = 0;

    Object.values(frequencyMap).forEach(({count, entry}) => {
        if (count > maxCount) {
            favoritePint = entry;
            maxCount = count;
        }
    });

    return favoritePint;
}

function findHighestAbv(pintEntries: PintEntry[]): PintEntry | null {
    if (pintEntries.length === 0) {
        return null;
    }

    let highestAbvEntry = pintEntries[0]; // Start with the first entry as the initial highest

    pintEntries.forEach(entry => {
        if (entry.abv > highestAbvEntry.abv) {
            highestAbvEntry = entry;
        }
    });

    return highestAbvEntry;
}

export default function MyPints() {
    const {currentUser, loading} = useAuth();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [pintHistory, setPintHistory] = useState<PintEntry[]>([]);

    const email = currentUser?.email ?? ''

    useEffect(() => {
        getUserDataById(email).then(setUserData);
    }, [email]);

    useEffect(() => {
        getUserPints(email).then(pints => {
            setPintHistory(pints);

        }).catch(error => {
            console.log(error);
        });
    }, [email]);

    if (loading) {
        return <Loading/>;
    }

    {
        !currentUser ? window.location.href = '/login' : null
    }


    const maxPintDay = findMaxPintDay(pintHistory);

    const favoritePint = findFavoritePint(pintHistory);

    const highestAbvPint = findHighestAbv(pintHistory);

    return (
        <main className="min-h-screen lg:p-10 p-4">
            {userData ? (
                <div className="my-5 flex flex-col">
                    <p className="text-pt-brown text-center text-6xl font-extrabold drop-shadow-2xl stat-info-main">Here's
                        your analytics, {userData.username}</p>
                </div>
            ) : (
                <Loading/>
            )}

            <div className='flex mb-16'>
                <Carousel>
                    <SwiperSlide>
                        <AnalyticsCard>
                            <h1 className="text-pt-brown text-3xl font-extrabold drop-shadow-2xl">Your favourite pint
                                is...</h1>
                            <h1 className="mt-6 mb-6 text-pt-brown text-5xl font-extrabold stat-info-main">{favoritePint?.name}</h1>
                            <h1 className='text-5xl'>🍻</h1>
                            <p className="text-pt-brown italic bottom-0 absolute mb-2">... cheers to that</p>
                        </AnalyticsCard>
                    </SwiperSlide>
                    <SwiperSlide>
                        <AnalyticsCard>
                            <h1 className="text-pt-brown text-3xl font-extrabold drop-shadow-2xl">You've drank...</h1>
                            <h1 className="mt-6 mb-6 text-pt-brown text-5xl font-extrabold stat-info-main">{pintHistory.length} pints</h1>
                            <h1 className='mt-6 mb-6 text-pt-brown text-xl font-extrabold stat-info-main'>since you've
                                joined 🍻</h1>
                            <p className="text-pt-brown italic bottom-0 absolute mb-2">... impressive!</p>
                        </AnalyticsCard>
                    </SwiperSlide>
                    <SwiperSlide>
                        <AnalyticsCard>
                            <h1 className="text-pt-brown text-3xl font-extrabold drop-shadow-2xl">Your Strongest pint
                                is...</h1>
                            <h1 className="mt-6 mb-6 text-pt-brown text-3xl font-extrabold stat-info-main overflow-auto ">{highestAbvPint?.name ?? 0}</h1>
                            <h1 className='mt-6 mb-6 text-pt-brown text-xl font-extrabold stat-info-main'>@ {highestAbvPint?.abv ?? 0}%
                                a.b.v 🥊</h1>
                            <p className="text-pt-brown italic bottom-0 absolute mb-2">... ooft</p>
                        </AnalyticsCard>
                    </SwiperSlide>
                    <SwiperSlide>
                        <AnalyticsCard>
                            <h1 className="text-pt-brown text-3xl font-extrabold drop-shadow-2xl">Your drank the most
                                pints on...</h1>
                            <h1 className="mt-6 mb-6 text-pt-brown text-4xl font-extrabold stat-info-main break-words">{maxPintDay?.date}</h1>
                            <h1 className='text-5xl'>📆</h1>
                            <h1 className='mt-6 mb-6 text-pt-brown text-xl font-extrabold stat-info-main'>with {maxPintDay?.count} pints
                                put away</h1>
                            <p className="text-pt-brown italic bottom-0 absolute mb-2">... save the date!</p>
                        </AnalyticsCard>
                    </SwiperSlide>
                </Carousel>
            </div>

            <div className={'lg:block hidden'}>
                <Panel width={"large"} shadow={"orange"} centered={true}>
                    <h5 className="my-2 text-5xl font-bold dark:text-white text-pt-brown text-center">Your Weekly
                        Pints</h5>
                    <AnalyticsLineChart weeklyPintHistory={pintHistory}/>
                </Panel>
            </div>
            <div className={'lg:hidden block'}>
                <Panel width={"large"} shadow={"orange"} centered={true} padding={'6'}>
                    <h5 className="mt-2 text-2xl font-bold dark:text-white text-pt-brown text-center">Your Weekly
                        Pints</h5>
                    <AnalyticsBarChart weeklyPintHistory={pintHistory}/>
                </Panel>
            </div>

        </main>
    );
}