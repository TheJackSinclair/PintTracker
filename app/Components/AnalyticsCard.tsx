
"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';
import '@splidejs/react-splide/css/core';

interface AnalyticsCardProps {
    title: string;
    content: any;
    analyticsType: string;
  }

const AnalyticsCard: React.FC<AnalyticsCardProps> = (props) => {

  // this is like onMounted() in vuejs
  useEffect(() => {
  }, []);

  const fetchName = async () => {
  };

  return (
    <div className="w-full h-full p-6 bg-pt-beige border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <h5 className=" mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.title}</h5>
        </a>
        
        {/* Conditional chain incoming... */}
        {
        props.analyticsType == 'list' ? (
        <div>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">List {props.content}</p>
        </div> 
        ) : props.analyticsType == 'single fact' ? (
            <div>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Fact {props.content}</p>
        </div> 
        ) :
        <p>other</p>
        }

    </div>
  );
}

export default AnalyticsCard;