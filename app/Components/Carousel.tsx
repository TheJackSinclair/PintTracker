import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { fetchUsername } from '../Common/UserCommon'
import AnalyticsCard from './AnalyticsCard';
import axios from 'axios';

export default function Carousel() {
    const [favPints, setFavPints] = useState({});
    const [strongestPint, setStrongestPint] = useState(null);
    const [numPintsDrank, setNumPintsDrank] = useState(null);
    const [username, setUsername] = useState<string | null>(null);

    // this is like onMounted() in vuejs
    useEffect(() => {
        let usernameFromLocalStorage = fetchUsername();
        // Update the state only if the name is not null
        if (usernameFromLocalStorage !== null) {
            setUsername(usernameFromLocalStorage);
        }
      fetchAnalytics();
    }, []);

    const fetchAnalytics= async () => {
        try {
            const response = await axios.get('/api/analytics', {params: username});
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      > 
        <SwiperSlide>
            <AnalyticsCard content={favPints} title="Your favourite pints are:" analyticsType="list"/>
        </SwiperSlide>
        <SwiperSlide>
            <AnalyticsCard content={favPints} title="Your favourite pints are:" analyticsType="list"/>
        </SwiperSlide>
        <SwiperSlide>
            <AnalyticsCard content={favPints} title="Your favourite pints are:" analyticsType="list"/>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
