"use client";

import React, {useEffect} from 'react';

interface AnalyticsCardProps {
    children: React.ReactNode;
}

const AnalyticsCard = (props: AnalyticsCardProps) => {

    useEffect(() => {
    }, []);


    return (
        <div
            className="w-full h-full p-6 bg-pt-beige border-4 border-gray-200 border-pt-brown rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {props.children}
        </div>
    );
}

export {AnalyticsCard};