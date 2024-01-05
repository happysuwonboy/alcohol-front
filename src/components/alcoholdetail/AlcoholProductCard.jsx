import ReviewInfo from './ReviewInfo';
import getImgUrl from '../../util/getImgUrl';

export default function AlcoholProductCard({ alcohol }) {

  const { alcohol_id, alcohol_name, alcohol_price, alcohol_img1, hashtag, avg_rate,
    alcohol_type, alcohol_volume, ABV, review_cnt, dc_percent } = alcohol

  return (
    <div className="alcohol_card_container">
      <div className="alcohol_img">
        <img src={getImgUrl.alcohol(alcohol_img1)} alt="" />
      </div>
      <div className="alcohol_info">
        <h3 className="alcohol_name">{alcohol_name}</h3>
        <span className="hashtag"><span style={{ marginRight: '3px' }}>#</span>{hashtag}</span>
        <ReviewInfo rate={avg_rate} reviewCnt={review_cnt} />
        <div className={`alcohol_price ${dc_percent ? 'discount' : 'no_discount'}`}>
          <small>판매 가격:</small>
          <span className='org_price'>{alcohol_price?.toLocaleString()}원</span>
          {dc_percent
            ?
            <p>
              <span className='dc_percent'>{dc_percent}%</span>
              <span className='dc_price'>{((alcohol_price*(100-dc_percent))/100)?.toLocaleString()}원</span>
            </p>
            : null
          }
        </div>
        <div className="alcohol_detail_info">
          <small className="alcohol_type">주종: {alcohol_type}</small>
          <small className="ABV">도수: {ABV?.toFixed(1)}%</small>
          <small className="alcohol_volume">용량: {alcohol_volume}ml</small>
          <small className="delivery">배송기간: 2일 이내 배송</small>
          <small className="win">수상: 2024년 최고의 우리술 부문 장려상</small>
          <small className="exp_date blue">유통기한: 제조일로부터 3개월</small>
          <small className="store_way blue">보관방법: 세워서 냉장 보관</small>
        </div>
      </div>
    </div>
  );
}
