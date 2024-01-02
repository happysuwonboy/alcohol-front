import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

export default function ReviewInfo({rate}) {

  return (
    <div className='review_info'>
      <div className='review_stars'>
        <div style={{width : `${(rate/5)*100}%`}} className="fill_stars">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <div className="background_stars">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
      </div>
      <small className='review_avg_rate'>{rate?.toFixed(1)}</small>
      <span className='review_count'>[598 리뷰]</span>
    </div>
  );
}