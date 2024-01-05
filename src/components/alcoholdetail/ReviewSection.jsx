import ReviewStar from '../home/ReviewStar';
import AlcoholAvata from '../home/AlcoholAvata';
import ReviewSort from './ReviewSort';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BASE_URL from '../../constants/baseurl';

export default function ReviewSection() {
  const [reviewList, setReviewList] = useState([]);
  const [selectOption, setSelectOption] = useState('detail');
  const [orderBy, setOrderBy] = useState('desc');
  const [colum, setColum] = useState('detail');
  const params = useParams();

  const param = {
    orderBy: orderBy,
    colum: colum
  };

  console.log(`먼저 ${selectOption} ${orderBy} ${colum}}`);

  const fetchData = () => {
    axios.get(`${BASE_URL}/alcoholdetail/review/list/${params.alcoholid}`, { params: param })
      .then(result =>{
        // console.log(result.data);
        setReviewList(result.data);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    if (selectOption === 'detail') {
      setOrderBy('desc');
      setColum('detail');
      console.log(param);
    } else if (selectOption === 'newest') {
      console.log(`최신순 ${param}}`);
      setOrderBy('desc');
      setColum('review_date');
    } else if (selectOption === 'desc') {
      console.log(`평점높은순 ${param}}`);
      setOrderBy('desc');
      setColum('review_star');
    } else if (selectOption === 'asc') {
      console.log(`평점낮은순 ${param}}`);
      setOrderBy('asc');
      setColum('review_star');
    };
    console.log(param)
    fetchData();
  }, [selectOption]);

  return (
    <div className='review_section'>
      <div>
        <button type='button'>리뷰</button>
        <ReviewSort setSelectOption={setSelectOption} />
      </div>
      <ul>
        {reviewList.map(review => (
          <li key={review.review_id}>
            <div>
              <p>{review.user_id}</p>
              <div>
                <ReviewStar rating={review.review_star} />
                <p>{review.review_star}</p>
                <p>{review.review_date}</p>
              </div>
            </div>
            <p>{review.review_content}</p>
            <AlcoholAvata img={`/assets/images/review/${review.review_img}`} alt={review.review_img} />
          </li>
        ))}
      </ul>
    </div>
  );
};