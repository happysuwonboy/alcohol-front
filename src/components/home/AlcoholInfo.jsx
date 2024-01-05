import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../../constants/baseurl";

export default function AlcoholInfo({ name, price, hashtag, sale, alcohol_id }) {
  const [reviewStar, setReviewStar] = useState();
  const originPrice = price.toLocaleString();
  const salePriceCalc = price - price * (sale / 100);
  const salePrice = salePriceCalc.toLocaleString();

  useEffect(() => {
    axios.get(`${BASE_URL}/${alcohol_id}`)
    .then(result => setReviewStar(result.data))
    .catch(error => console.log(error))
  }, []);

  return (
    <div className='alcohol_info'>
      <p>{name}</p>
      {sale === 0 || <p className='origin_price'>{originPrice}원</p>}
      <p className='sale_price'>{sale === 0 ? null : <span className='sale'>{sale}% </span>}{salePrice}<span>원</span></p>
      <div>
        <figcaption><img src='/assets/images/home/star.png' alt='' /></figcaption>
        {reviewStar?.map(star => <p key={star.avg_rate}>{star.avg_rate === null ? '첫 리뷰를 기다리고 있어요!' : star.avg_rate}</p>)}
      </div>
      <p>#{hashtag}</p>
    </div>
  );
};