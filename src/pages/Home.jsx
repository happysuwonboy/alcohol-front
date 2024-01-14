import MainSwiper from '../components/home/MainSwiper';
import CategoryIcon from '../components/home/CategoryIcon';
import CategorySwiper from '../components/home/CategorySwiper';
import ReviewSwiper from '../components/home/ReviewSwiper';
import { useRef } from 'react';

export default function Home() {
  const categorySwiperData = [
    {
      condition: '10ABV',
      title: '10도 이상 도수',
      subTitle: '술자리 화합을 이끌어 보세요!',
      img: '10ABV_cate.png'
    },
    {
      condition: '20ABV',
      title: '20도 이상 도수',
      subTitle: '깊고 진하게 즐겨 보세요!',
      img: '20ABV_cate.png'
    },
    {
      condition: 'sale',
      title: '전통주 SALE!',
      subTitle: '세일이 끝나기 전에 어서 오세요!',
      img: 'sale_cate.png'
    }
  ];

  const swiperRef = useRef([]);

  return (
    <main className='home'>
      <MainSwiper swiperRef={swiperRef} />
      <CategoryIcon />
      {categorySwiperData.map((category, index) =>
        <CategorySwiper
          key={category.condition}
          condition={category.condition}
          title={category.title}
          subtitle={category.subTitle}
          png={category.img}
          index={index}
          swiperRef={swiperRef}
        />
      )}
      <ReviewSwiper
        swiperRef={swiperRef}
      />
    </main>
  );
};