import ReviewStar from '../home/ReviewStar';
import AlcoholAvata from '../home/AlcoholAvata';
import ReviewSort from './ReviewSort';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BASE_URL from '../../constants/baseurl';
import getImgUrl from '../../util/getImgUrl';
import NoReview from './NoReview';

export default function ReviewSection() {
  const [reviewList, setReviewList] = useState([]);
  const [selectOption, setSelectOption] = useState('detail');
  const [page, setPage] = useState(1);
  const isMounted = useRef(false);
  const params = useParams();

  const param = {
    selectOption: selectOption,
    page: page,
    pageItem: 2
  };

  const fetchData = () => {
    axios.get(`${BASE_URL}/alcoholdetail/review/list/${params.alcoholid}`, { params: param })
      .then(result => setReviewList(prevData => [...prevData, ...result.data]))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    if (isMounted.current) {
      fetchData();
    } else {
      isMounted.current = true;
    }
  }, [page, selectOption])

  const handleMoreReview = () => {
    setPage(page => page + 1);
  };

  return (
    <div className='review_section'>
      <div className='sor_tab'>
        <button type='button'>리뷰</button>
        <ReviewSort setSelectOption={setSelectOption}
          setReviewList={setReviewList}
          setPage={setPage} />
      </div>
      {reviewList.length === 0 ?
        <NoReview ment='작성된' /> :
        (
          <>
            <ul>
              {reviewList.map(review => (
                <li key={review.review_id}>
                  <div className='review_detail_tab'>
                    <p>{review.user_id}</p>
                    <div>
                      <ReviewStar rating={review.review_star} />
                      <p>{review.review_star}</p>
                      <p>{review.review_date}</p>
                    </div>
                  </div>
                  <div className='review_detail_content'>
                    <p>{review.review_content}</p>
                    <AlcoholAvata img={getImgUrl.review(review.review_img)} alt={review.review_img} />
                  </div>
                </li>
              ))}
            </ul>
            <div className='more_review_btn'>
              <button type='button' onClick={handleMoreReview}>
                더 많은 리뷰
              </button>
            </div>
          </>
        )
      }
    </div>
  );
};