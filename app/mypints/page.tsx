"use client";

import React, { useState, useEffect } from 'react';
import Carousel from '../Components/Carousel';
import axios from 'axios';

export default function MyPints() {
  const [name, setName] = useState(null);

  // this is like onMounted() in vuejs
  useEffect(() => {
    fetchName();

  }, []);

  const fetchName = async () => {
    try {
      const response = await axios.get('/api/name');
      setName(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    
  };

  return (
    <main className="min-h-screen p-10">
      {name ? (
        <div className="my-5 flex flex-col">
          <p className="text-pt-brown text-center text-6xl font-extrabold drop-shadow-2xl">Here's your analytics, {name}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      
      <Carousel/>
      
    </main>
  );
}