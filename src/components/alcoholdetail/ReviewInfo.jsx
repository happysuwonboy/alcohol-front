import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

export default function ReviewInfo({rate, reviewCnt}) {

  return (
    <div className='review_info'>
      <div className='review_stars'>
          {!reviewCnt 
          ? 
          <div className='no_review'>
            <span>리뷰 없음</span>
          </div> : null}
        <div style={{width : !reviewCnt ? `0%` : `${(rate/5)*100}%`}} className="stars fill_stars">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <div className="stars background_stars">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
      </div>
      <small className='review_avg_rate'>{rate?.toFixed(1)}</small>
      <span className='review_count'>
        {reviewCnt
        ?
        `[리뷰 ${reviewCnt}건]`
        :
        `첫 리뷰를 기다리고 있어요!`}
      </span>
    </div>
  );
}