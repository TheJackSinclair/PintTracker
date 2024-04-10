{/* Carousel component for a users statistics. Usage: <Carousel> wasup playa </Carousel> */}

import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { fetchUsername } from '../Common/UserCommon'

interface CarouselProps {
  children: React.ReactNode;
}

export default function Carousel(props: CarouselProps) {
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
        {props.children}
      </Swiper>
    </>
  );
}
