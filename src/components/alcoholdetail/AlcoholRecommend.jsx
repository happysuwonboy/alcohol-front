import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Navigation, Pagination } from 'swiper/modules'
import BASE_URL from './../../constants/baseurl';
import { useState } from "react";

export default function AlcoholRecommend({ alcohol_id, alcohol_type }) {
  const [list, setList] = useState([]);

  axios({
    url : `${BASE_URL}/alcoholdetail/recommend/${alcohol_id}`,
    method : 'get'
  })
  .then(res => setList(res.data))
  .catch(err => console.log(err))
  
  return (
    <div className='alcohol_recommend_container subsection_container'>
      <h4>연관 상품</h4>
      <small className='sub_desc'>
        또 다른 <b style={{ color: 'orange' }}>{alcohol_type}</b> 상품들을 추천해드릴게요!
      </small>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={15}
          slidesPerView={2.3}
          breakpoints={{
            0 : {
              slidesPerView : 2.3
            },
            800 : {
              slidesPerView : 4
            }
          }}
          navigation
        >
            <SwiperSlide>
                <div className='alcohol_img'>
                  <img src="/assets/images/alcohol_img/AC0002_1.jpg" alt="" />
                </div>
                <h6 className="alcohol_name">
                  술이름입니다
                </h6>
                <span className="alcohol_price">
                  15,000원
                </span>
            </SwiperSlide>
            <SwiperSlide>
                <div className='alcohol_img'>
                  <img src="/assets/images/alcohol_img/AC0002_1.jpg" alt="" />
                </div>
                <h6 className="alcohol_name">
                  술이름입니다
                </h6>
                <span className="alcohol_price">
                  15,000원
                </span>
            </SwiperSlide>
            <SwiperSlide>
                <div className='alcohol_img'>
                  <img src="/assets/images/alcohol_img/AC0002_1.jpg" alt="" />
                </div>
                <h6 className="alcohol_name">
                  술이름입니다
                </h6>
                <span className="alcohol_price">
                  15,000원
                </span>
            </SwiperSlide>
            <SwiperSlide>
                <div className='alcohol_img'>
                  <img src="/assets/images/alcohol_img/AC0002_1.jpg" alt="" />
                </div>
                <h6 className="alcohol_name">
                  술이름입니다
                </h6>
                <span className="alcohol_price">
                  15,000원
                </span>
            </SwiperSlide>
            <SwiperSlide>
                <div className='alcohol_img'>
                  <img src="/assets/images/alcohol_img/AC0002_1.jpg" alt="" />
                </div>
                <h6 className="alcohol_name">
                  술이름입니다
                </h6>
                <span className="alcohol_price">
                  15,000원
                </span>
            </SwiperSlide>
            <SwiperSlide>
                <div className='alcohol_img'>
                  <img src="/assets/images/alcohol_img/AC0002_1.jpg" alt="" />
                </div>
                <h6 className="alcohol_name">
                  술이름입니다
                </h6>
                <span className="alcohol_price">
                  15,000원
                </span>
            </SwiperSlide>
            <SwiperSlide>
                <div className='alcohol_img'>
                  <img src="/assets/images/alcohol_img/AC0002_1.jpg" alt="" />
                </div>
                <h6 className="alcohol_name">
                  술이름입니다
                </h6>
                <span className="alcohol_price">
                  15,000원
                </span>
            </SwiperSlide>
            <SwiperSlide>
                <div className='alcohol_img'>
                  <img src="/assets/images/alcohol_img/AC0002_1.jpg" alt="" />
                </div>
                <h6 className="alcohol_name">
                  술이름입니다
                </h6>
                <span className="alcohol_price">
                  15,000원
                </span>
            </SwiperSlide>
        </Swiper>
    </div>
  );
}