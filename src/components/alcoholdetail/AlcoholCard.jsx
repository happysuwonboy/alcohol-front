import ReviewInfo from './ReviewInfo';

export default function AlcoholCard() {
  return (
    <div className="alcohol_card_container">
      <div className="alcohol_img">
        <img src="/assets/images/alcohol_img/AC0001_1.jpg" alt="" />
      </div>
      <div className="alcohol_info">
        <h3 className="alcohol_name">담은 [3병/6병/10병]</h3>
        <span className="hashtag">#입안을 가득 채우는 푸근함</span>
        <ReviewInfo />
        <div className="alcohol_price">
          <small>판매 가격:</small>
          <span>33,000원</span>
        </div>
        <div className="alcohol_detail_info">
          <small className="alcohol_type">주종: 탁주</small>
          <small className="ABV">도수: 6.50%</small>
          <small className="alcohol_volume">용량: 750ml</small>
          <small className="delivery">배송기간: 2일 이내 배송</small>
          <small className="win">수상: 2024년 최고의 우리술 부문 장려상</small>
          <small className="exp_date blue">유통기한: 제조일로부터 3개월</small>
          <small className="store_way blue">보관방법: 세워서 냉장 보관</small>
        </div>
      </div>
    </div>
  );
}
