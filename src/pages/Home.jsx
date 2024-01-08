import MainSwiper from '../components/home/MainSwiper';
import CategoryIcon from '../components/home/CategoryIcon';
import CategorySwiper from '../components/home/CategorySwiper';
import ReviewSwiper from '../components/home/ReviewSwiper';

export default function Home() {
  const categorySwiper = [
    [{ colum: 'ABV', sign: '>=', condition: 10 }, '10도 이상 도수', '술자리 화합을 이끌어 보세요!', '10ABV_cate.png'],
    [{ colum: 'ABV', sign: '>=', condition: 20 }, '20도 이상 고도수', '깊고 진하게 즐겨 보세요!', '20ABV_cate.png'],
    [{ colum: 'dc_percent', sign: '>', condition: 0 }, '전통주 SALE!', '세일이 끝나기 전에 어서 오세요!', 'sale_cate.png'],
  ];

  return (
    <main className='home'>
      <MainSwiper />
      <CategoryIcon />
      {categorySwiper.map(category =>
        <CategorySwiper
          key={category[3]}
          params={category[0]}
          title={category[1]}
          subtitle={category[2]}
          png={category[3]}
        />
      )}
      <ReviewSwiper />
    </main>
  );
};