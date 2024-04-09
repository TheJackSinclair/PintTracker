"use client";

import React, { useState, useEffect } from 'react';
import Carousel from '../Components/Carousel';
import { fetchUsername } from '../Common/UserCommon'
import axios from 'axios';

export default function MyPints() {
  const [username, setUsername] = useState<string | null>(null);

  // this is like onMounted() in vuejs
  useEffect(() => {
    let usernameFromLocalStorage = fetchUsername();
    // Update the state only if the name is not null
    if (usernameFromLocalStorage !== null) {
      setUsername(usernameFromLocalStorage);
    }
  }, []);

  return (
    <main className="min-h-screen p-10">
      {username ? (
        <div className="my-5 flex flex-col">
          <p className="text-pt-brown text-center text-6xl font-extrabold drop-shadow-2xl">Here's your analytics, {username}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      
      <Carousel/>
      
    </main>
  );
}