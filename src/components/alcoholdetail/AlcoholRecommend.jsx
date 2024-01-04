import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Navigation, Pagination } from 'swiper/modules'
import BASE_URL from './../../constants/baseurl';
import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";



export default function AlcoholRecommend({ alcohol_id, alcohol_type }) {
  const [swiper, setSwiper] = useState(null)
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  

  useEffect(()=>{
    axios({
      url : `${BASE_URL}/alcoholdetail/recommend/${alcohol_id}`,
      method : 'get'
    })
    .then(res => setList(res.data))
    .catch(err => console.log(err))
  },[alcohol_id])

  const getHandleClick = alcohol_id => () => {
    navigate(`/findalcohol/${alcohol_id}`)
    setTimeout(()=>{
      window.scrollTo({top : 0, behavior : 'smooth'})
    },100)
  } 

  useEffect(()=>{
    swiper?.slideTo(0)
  },[alcohol_id])

  return (
    <div className='alcohol_recommend_container subsection_container'>
      <h4>연관 상품</h4>
      {list.length ? <small className='sub_desc'>
        또 다른 <b style={{ color: '#0096f3' }}>{alcohol_type}</b> 상품들을 추천해드릴게요!
      </small> : null}

        {list.length ? 
        <>
          <Swiper
            onSwiper={setSwiper}
            modules={[Navigation, Pagination]}
            spaceBetween={15}
            slidesPerView={2.3}
            breakpoints={{
              0 : {
                slidesPerView : 2.3
              },
              800 : {
                slidesPerView : 4,
                navigation : {
                  prevEl : '.custom_btn_prev',
                  nextEl : '.custom_btn_next',
                }
              }
            }}
          >
            {list.map(alcohol => 
              <SwiperSlide key={alcohol.alcohol_id} onClick={getHandleClick(alcohol.alcohol_id)}>
                  <div className='alcohol_img'>
                    <img src={`/assets/images/alcohol_img/${alcohol.alcohol_img}`} alt="" />
                  </div>
                  <h6 className="alcohol_name">
                    {alcohol.alcohol_name}
                  </h6>
                  <div className={`alcohol_price ${alcohol.dc_percent ? 'discount' : 'no_discount'}`}>
                    <span className="org_price">
                      {alcohol.alcohol_price?.toLocaleString()}원
                    </span>
                    <p> 
                      <span className='dc_percent'>{alcohol.dc_percent}%</span>
                      <span className='dc_price'>{((alcohol.alcohol_price*(100-alcohol.dc_percent))/100)?.toLocaleString()}원</span>
                    </p>
                  </div>
              </SwiperSlide>
            )}
          </Swiper>
            <button className="custom_btn_prev" >
              <GrFormPrevious/>
            </button>
            <button className="custom_btn_next">
            <GrFormNext/>
            </button>
        </>
        : <div className='no_list' style={{fontSize:'.9rem', color:'#555', textAlign:'center', padding:'5rem 0'}}>
          연관 상품 목록이 없습니다.
          </div>}
    </div>
  );
}