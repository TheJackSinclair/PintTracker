"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {name ? (
        <div className=" ">
          <p>Here are your analytics, {name}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}