import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { Autoplay } from 'swiper/modules';

export default function MainSwiper() {
  const slidesData = ['10ABV', '20ABV', 'Review', 'Sale']
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [swiper, setSwiper] = useState();

  const handlePrev = () => {
    swiper?.slidePrev()
  };
  const handleNext = () => {
    swiper?.slideNext()
  };

  return (
    <Swiper
      // modules={[Autoplay]}
      loop={true}
      onActiveIndexChange={(e) => setSwiperIndex(e.realIndex)}
      onSwiper={(e) => setSwiper(e)}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      className='main_swiper'
    >
      {slidesData.map(slide => (
        <SwiperSlide key={slide}>
          <button>
            <img src={`/assets/images/home/${slide}.jpg`} alt={slide} />
          </button>
        </SwiperSlide>
      ))}
      <div className='swiper_nav_btn'>
        <button onClick={handlePrev}><MdArrowBackIos /></button>
        <button onClick={handleNext}><MdArrowForwardIos /></button>
        <div>
          <span>{swiperIndex + 1}</span>
          <span> / </span>
          <span>{slidesData.length}</span>
        </div>
      </div>
    </Swiper>
  );
};