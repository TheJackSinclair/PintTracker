
"use client";

import React, { useState, useEffect, Children } from 'react';
import axios from 'axios';

interface AnalyticsCardProps {
    children: React.ReactNode;
  }

const AnalyticsCard = (props: AnalyticsCardProps) => {

  // this is like onMounted() in vuejs
  useEffect(() => {
  }, []);


  return (
    <div className="w-full h-full p-6 bg-pt-beige border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {props.children}
    </div>
  );
}

export default AnalyticsCard;