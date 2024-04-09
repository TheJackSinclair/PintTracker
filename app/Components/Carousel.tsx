import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import AnalyticsCard from './AnalyticsCard';

export default function Carousel() {
    const [favPints, setFavePints] = useState({});

    // this is like onMounted() in vuejs
    useEffect(() => {
      fetchCardData();
  
    }, []);
  
    const fetchCardData = async () => {
    //   try {
    //     const response = await axios.get('/api/name');
    //     setName(response.data);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
      
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
        <AnalyticsCard content="jjj" title="kkk"/>
        </SwiperSlide>
        <SwiperSlide>
          <AnalyticsCard content="jjj" title="kkk"/>
        </SwiperSlide>
        <SwiperSlide>
        <AnalyticsCard content="jjj" title="kkk"/>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
