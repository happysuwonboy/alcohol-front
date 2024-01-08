import { useEffect, useState } from 'react';
import AlcoholAvata from '../../../home/AlcoholAvata';
import ReviewStar from '../../../home/ReviewStar';
import axios from 'axios';
import BASE_URL from '../../../../constants/baseurl';
import PagiNation from 'react-js-pagination';
import getImgUrl from '../../../../util/getImgUrl';

export default function SubmittedReviewSection() {
  const [myReviewList, setMyReviewList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const userid = 'user123';// 임시 유저 정보 설정해둠! 지우기!!!!
  const [page, setPage] = useState(1);

  const params = {
    page: page,
    pageItem: 2
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/mypage/review/${userid}`, { params })
      .then(result => {
        setMyReviewList(result.data);
        setTotalCount(result.data[0].total_rows);
      })
      .catch(error => console.log(error))
  }, [page]);


  // 페이지 변경을 처리하는 함수
  const handleChange = (page) => {
    setPage(page);
  };

  return (
    <div className='submit_review'>
      <ul>
        {myReviewList.map(myReview => (
          <li key={myReview.review_id}>
            {/* <input type='checkbox' id={'check1'} />
          <label htmlFor={`check1`} ></label> */}
            <div className='review_detail'>
              <div className='review_detail_tab'>
                <p>{myReview.alcohol_name}</p>
                <div>
                  <div className='review_star'>
                    <ReviewStar rating={myReview.review_star} />
                    <p>{myReview.review_star}</p>
                  </div>
                  <p>{myReview.review_date}</p>
                </div>
              </div>
              <div className='review_detail_content'>
                <div className='review_content_img'>
                  <p>{myReview.review_content}</p>
                  <AlcoholAvata img={getImgUrl.review(myReview.review_img)} alt={myReview.review_img} />
                </div>
                <div className='edit_delete_btn'>
                  <button type='button'>수정</button>
                  <button type='button'>삭제</button>
                </div>
              </div>
            </div>
          </li>
        ))
        }
      </ul>
      <PagiNation
        activePage={page} // 현재 페이지
        itemsCountPerPage={params.pageItem} // 현재 페이지당 보여줄 아이템 개수
        totalItemsCount={totalCount} // 총 아이템 개수
        pageRangeDisplayed={3} // 보여줄 페이지 범위
        prevPageText={'<'} // 이전을 나타낼 텍스트
        nextPageText={'>'} // 다음을 나타낼 텍스트
        onChange={handleChange} // 함수 호출
      />
    </div>
  );
};