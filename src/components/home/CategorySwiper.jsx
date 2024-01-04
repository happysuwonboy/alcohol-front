import { useEffect, useState } from 'react';
import AlcoholAvata from './AlcoholAvata';
import AlcoholInfo from './AlcoholInfo';
import CategoryTitle from './CategoryTitle';
import axios from 'axios';
import BASE_URL from '../../constants/baseurl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

export default function CategorySwiper({ params, title, subtitle, png }) {
  const [categoryList, setcategoryList] = useState([]);
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [swiper, setSwiper] = useState();
  const [prevArrow, setPrevArrow] = useState('icon_prev_arrow_inactive');
  const [nextArrow, setNextArrow] = useState('icon_next_arrow_active');
  const [slidePerView, setSlidePerView] = useState(4);

  // navigation
  const handlePrev = () => {
    swiper?.slidePrev();
  };
  const handleNext = () => {
    swiper?.slideNext();
  };

  useEffect(() => {
    axios.get(`${BASE_URL}`, { params })
      .then(result => {
        setcategoryList(result.data)
        console.log(result.data);
      })
      .catch(error => console.log(error));
  }, []);

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

  // swiperIndex에 따른 navigation button 이벤트
  useEffect(() => {
    if (swiperIndex === slidePerView) {
      setPrevArrow('icon_prev_arrow_active');
    } else if (swiperIndex === 0) {
      setPrevArrow('icon_prev_arrow_inactive');
    } else if ((swiperIndex + slidePerView) !== categoryList.length) {
      setNextArrow('icon_next_arrow_active');
    } else if ((swiperIndex + slidePerView) >= categoryList.length) {
      setNextArrow('icon_next_arrow_inactive');
    };
  }, [swiperIndex, categoryList]);

  return (
    <div className='category_swiper'>
      <CategoryTitle
      title={title}
      subtitle={subtitle}
      png={png}
      add={true}
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
              slidesPerGroup: 2,
            },
            700: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            1025: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
          }}
        >
          {categoryList?.map(category => (
            <SwiperSlide key={category.alcohol_id}>
              <Link to={`/findalcohol/${category.alcohol_id}`}>
                <AlcoholAvata img={`/assets/images/alcohol_img/${category.alcohol_img1}`} alt={category.alcohol_img1} />
                <AlcoholInfo name={category.alcohol_name}
                  price={category.alcohol_price}
                  hashtag={category.hashtag}
                  sale={category.dc_percent} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <button onClick={handleNext} disabled={(swiperIndex + slidePerView) === categoryList.length}>
          <img src={`/assets/images/home/${nextArrow}.png`} alt='icon_next_arrow_inactive' />
        </button>
      </div>
      <div className='category_more_button'>
        <Link>더 많은 제품 보러 가기 <IoIosArrowForward /></Link>
      </div>
    </div>
  );
};