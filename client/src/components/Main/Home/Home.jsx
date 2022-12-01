import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import "swiper/css/free-mode";
import { Link } from "react-router-dom";

const Home = ()=>{
  return(
    <React.Fragment>
      <Swiper freeMode={true}
          grabCursor={true}
          modules={[FreeMode]}
          className='homeDirectory'
          slidesPerView={2}
          spaceBetween={30}>
          <SwiperSlide className='plusCard'><Link to="/list/restaurants"><h3>Ver más</h3></Link></SwiperSlide>
          <SwiperSlide className='plusCard'><Link to="/list/restaurants"><h3>Ver más</h3></Link></SwiperSlide>
          <SwiperSlide className='plusCard'><Link to="/list/restaurants"><h3>Ver más</h3></Link></SwiperSlide>
          <SwiperSlide className='plusCard'><Link to="/list/restaurants"><h3>Ver más</h3></Link></SwiperSlide>
        </Swiper>
    </React.Fragment>
  )
}

export default Home;
