import { useEffect, useState } from 'react';
import NoReview from '../../../alcoholdetail/NoReview';
import axios from 'axios';
import BASE_URL from '../../../../constants/baseurl';
import PagiNation from 'react-js-pagination';
import getImgUrl from '../../../../util/getImgUrl';
import { Link } from 'react-router-dom';
import AddReviewModal from './AddReviewModal';

export default function CreateReviewSection(props) {
  const { userId, startDate, endDate, page, setPage, setNotWritten, 
    notWritten, onContent, searchTerm, setAddModal, addModal } = props;
  const [totalCount, setTotalCount] = useState(0);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [selectedAcoholName, setSelectedAcoholName] = useState(null);

  // 현재 날짜로 부터 30일이내 구하기
  const wYear = new Date(new Date().setDate(new Date().getDate() - 30)).getFullYear();
  const wMonth = ('0' + (new Date(new Date().setDate(new Date().getDate() - 30)).getMonth() + 1)).slice(-2);
  const wDate = ('0' + new Date(new Date().setDate(new Date().getDate() - 30)).getDate()).slice(-2);
  const within30Days = `${wYear}-${wMonth}-${wDate}`;

  // 주문 상세보기
  const handleClick = (content) => {
    onContent(content);
    window.scrollTo({ top: 0 });
  };

  const params = {
    page: page,
    pageItem: 1,
    startDate: startDate === null ? null : new Date(startDate).toISOString().split('T')[0],
    endDate: endDate === null ? null : new Date(endDate).toISOString().split('T')[0],
    searchTerm: searchTerm
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/mypage/review/create/${userId}`, { params })
    // axios.get(`${BASE_URL}/mypage/review/create/123`, { params })
      .then(result => {
        setNotWritten(result.data);
        setTotalCount(result.data[0].reviewInfo.total_rows);
      })
      .catch(error => console.log(error));
  }, [page, startDate, endDate, searchTerm]);

  // 페이지 변경을 처리하는 함수
  const handleChange = (page) => {
    setPage(page);
  };

  const handleEdit = () => {
    setAddModal(true);
  };

  return (
    notWritten.length !== 0 ?
      (<div className='create_review'>
        {notWritten?.map((review, index) =>
          <div className='create_review_order_id_box' key={index}>
            <div className='review_order_id_header'>
              <p className='date'>{review.reviewInfo.order_date}</p>
              <button type='button' onClick={() => handleClick('MyOrderDetail')}>주문 상세보기 &gt;</button>
            </div>
            <div className='review_alcohols'>
              {(review.reviewAlcohols)?.map((alcohol, index) =>
                  <div className='alcohol' key={index}>
                    <div className='alcohol_img'>
                      <Link to={`/findalcohol/${alcohol.alcohol_id}`}>
                        <img src={getImgUrl.alcohol(alcohol.alcohol_img1)} alt='alcohol_img' />
                      </Link>
                    </div>
                    <div className="alcohol_info">
                      <p className='alcohol_title'>
                        <span>{alcohol.alcohol_name}</span>
                        <span className='icon'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 15 12" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M13.3025 10.2042C14.4338 9.03322 14.9995 7.51674 15 5.99995C14.9995 4.48332 14.4338 2.96684 13.3025 1.79585C10.9568 -0.632704 6.99298 -0.573297 4.6148 1.82333C2.47081 3.98375 1.05584 5.04451 0.246543 5.55392C-0.0821809 5.76073 -0.0821809 6.23917 0.246543 6.4463C1.05584 6.95571 2.47081 8.0163 4.6148 10.1767C6.99298 12.5732 10.9568 12.6328 13.3025 10.2042Z" fill="#00dc92"></path><path d="M10.4151 3.42067C10.411 2.71358 9.85255 2.14258 9.16508 2.14258C8.47762 2.14258 7.91918 2.71358 7.9151 3.42067L7.91048 4.22357L7.16666 3.97999C6.51159 3.76547 5.81106 4.1353 5.59862 4.8078C5.38618 5.4803 5.74158 6.20303 6.39413 6.42552L7.13509 6.67815L6.68001 7.3305C6.27923 7.90502 6.40472 8.70459 6.96089 9.12021C7.51706 9.53584 8.29515 9.41151 8.70252 8.84192L9.16508 8.19516L9.62765 8.84192C10.035 9.41151 10.8131 9.53584 11.3693 9.12021C11.9254 8.70459 12.0509 7.90502 11.6502 7.3305L11.1951 6.67815L11.936 6.42552C12.5886 6.20303 12.944 5.4803 12.7315 4.8078C12.5191 4.1353 11.8186 3.76547 11.1635 3.97999L10.4197 4.22357L10.4151 3.42067Z" fill="white"></path></svg>
                        </span>
                      </p>
                      <p className='alcohol_volume'>[{alcohol.alcohol_volume}ml] {alcohol.alcohol_name}</p>
                      <p className='price_qty'>
                        <span className="alcohol_price">
                          {alcohol.dc_percent === 0
                            ? (alcohol.alcohol_price).toLocaleString()
                            : (alcohol.alcohol_price * (100 - alcohol.dc_percent) * 0.01).toLocaleString()
                          }원 /
                        </span>
                        <span className="alcohol_qty"> 수량 {alcohol.order_qty}개</span>
                      </p>
                    </div>
                    {alcohol.register_review ? <button type='button' className='review_create_success_btn' disabled>리뷰 등록완료</button> :
                      (review.reviewInfo.order_date >= within30Days ? <button type='button' className='review_create_btn'
                      onClick={() => {
                        handleEdit();
                        setSelectedReviewId(alcohol.order_detail_id);
                        setSelectedAcoholName(alcohol.alcohol_name);
                      }}>리뷰 등록하기</button>
                        : <button type='button' className='review_impossible_btn' disabled>기간 만료</button>)}
                  </div>
              )}
              {addModal && <AddReviewModal setAddModal={setAddModal} selectedReviewId={selectedReviewId} 
              selectedAcoholName={selectedAcoholName} userId={userId} />}
            </div>
          </div>
        )}
        <PagiNation
          activePage={page} // 현재 페이지
          itemsCountPerPage={params.pageItem} // 현재 페이지당 보여줄 아이템 개수
          totalItemsCount={totalCount} // 총 아이템 개수
          pageRangeDisplayed={3} // 보여줄 페이지 범위
          prevPageText={'<'} // 이전을 나타낼 텍스트
          nextPageText={'>'} // 다음을 나타낼 텍스트
          onChange={handleChange} // 함수 호출
        />
      </div>) :
      <NoReview ment={'작성 가능한'} />
  );
};