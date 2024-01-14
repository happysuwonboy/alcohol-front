// import { Swiper, SwiperSlide } from 'swiper/types';
import CategoryTitle from './CategoryTitle';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AlcoholAvata from './AlcoholAvata';
import axios from 'axios';
import BASE_URL from '../../constants/baseurl';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewStar from './ReviewStar';
import getImgUrl from '../../util/getImgUrl';

export default function ReviewSwiper({swiperRef}) {
  const [reviewList, setReviewList] = useState([]);
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [swiper, setSwiper] = useState();
  const [prevArrow, setPrevArrow] = useState('icon_prev_arrow_inactive');
  const [nextArrow, setNextArrow] = useState('icon_next_arrow_active');
  const [slidePerView, setSlidePerView] = useState(3);

  // navigation
  const handlePrev = () => {
    swiper?.slidePrev();
  };
  const handleNext = () => {
    swiper?.slideNext();
  };

  // slideperview 갯수
  const handleResize = () => {
    if (window.innerWidth < 700) { setSlidePerView(2) }
    else if (window.innerWidth < 1025) { setSlidePerView(3) }
    else if (window.innerWidth >= 1025) { setSlidePerView(4) }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    // 언마운트 될 때 이벤트 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}/home/review`)
    .then(result => setReviewList(result.data))
    .catch(error => console.log(error))
  }, []);

    // swiperIndex에 따른 navigation button 이벤트
    useEffect(() => {
      if (swiperIndex === 1) {
        setPrevArrow('icon_prev_arrow_active');
      } else if (swiperIndex === 0) {
        setPrevArrow('icon_prev_arrow_inactive');
      } else if ((swiperIndex + slidePerView) !== reviewList.length) {
        setNextArrow('icon_next_arrow_active');
      } else if ((swiperIndex + slidePerView) >= reviewList.length) {
        setNextArrow('icon_next_arrow_inactive');
      };
    }, [swiperIndex, reviewList]);

  return (
    <div className='review_swiper' ref={el => (swiperRef.current[3] = el)}>
      <CategoryTitle
      title={'"이 순간 다른 분들은"'}
      subtitle={'실시간 베스트 리뷰'}
      png={'icon_only_sooldamhwa.png'}
      />
      <div className='category_button_swiper'>
        <button onClick={handlePrev} disabled={swiperIndex === 0} >
          <img src={`/assets/images/home/${prevArrow}.png`} alt='icon_prev_arrow_inactive' />
        </button>
        <Swiper
          loop={false}
          onActiveIndexChange={(e) => setSwiperIndex(e.realIndex)}
          onSwiper={(e) => setSwiper(e)}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            700: {
              slidesPerView: 3,
            },
          }}
        >
          {reviewList?.map(review => (
            <SwiperSlide key={review.review_id}>
              <Link to={`/findalcohol/${review.alcohol_id}`}>
                <AlcoholAvata img={getImgUrl.review(review.review_img)} alt={review.review_img} />
                <ReviewStar rating={review.review_star} />
                <p>{review.review_content}</p>
                <p>{review.user_id}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <button onClick={handleNext} disabled={(swiperIndex + slidePerView) === reviewList.length}>
          <img src={`/assets/images/home/${nextArrow}.png`} alt='icon_next_arrow_inactive' />
        </button>
      </div>
    </div>
  );
};