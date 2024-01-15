import { useEffect, useRef, useState } from 'react';
import AlcoholAvata from '../../../home/AlcoholAvata';
import ReviewStar from '../../../home/ReviewStar';
import axios, { all } from 'axios';
import BASE_URL from '../../../../constants/baseurl';
import PagiNation from 'react-js-pagination';
import getImgUrl from '../../../../util/getImgUrl';
import NoReview from '../../../alcoholdetail/NoReview';
import StarInput from './StarInput';
import { FaRegEdit } from "react-icons/fa";

export default function SubmittedReviewSection({ searchTerm, userid, reviewList, setReviewList, setPage, page, selectOption }) {
  const [totalCount, setTotalCount] = useState(0);
  const [checkedReview, setCheckedReview] = useState([]);
  const [checkedReview2, setCheckedReview2] = useState([]);
  const [allCheckList, setAllCheckList] = useState([]);
  const [star, setStar] = useState(0);
  const [form, setForm] = useState({ id: '', content: '', star: star });
  const [imageFile, setImageFile] = useState(null);
  const [inputCountContent, setInputCountContent] = useState(0);
  const fileInputRef = useRef(null);
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [noSearchResult, setNoSearchResult] = useState(false);

  // 체크박스 단일 선택
  // 체크된 각 ID를 인자로 받아, 해당 ID가 이미 선택된 ID인지 아닌지를 확인
  const handleCheckedReview = (review_id) => {
    const isChecked = checkedReview.includes(review_id);
    if (!isChecked) {
      setCheckedReview((prevCheckedReview) => [...prevCheckedReview, review_id]);
    } else {
      setCheckedReview((prevCheckedReview) =>
        prevCheckedReview.filter(review => review !== review_id)
      );
    }
  };

  // 체크박스 전체 선택
  // 전체 선택 클릭 시 페이지별 모든 리뷰를 setCheckedItems에 담아 상태 업데이트
  const handleAllCheck = (checked) => {
    if (checked) {
      setCheckedReview(allCheckList.map(review => review.review_id));
      setCheckedReview2(allCheckList.map(review => review.order_detail_id));
    }
    else {
      // 전체 선택 해제 시 checkItems를 빈 배열로 상태 업데이트
      setCheckedReview([]);
      setCheckedReview2([]);
    };
  };

  // 전체 삭제하기 위해 전체 데이터 요청
  useEffect(() => {
    axios.get(`${BASE_URL}/mypage/review/all/${userid}`)
      .then(result => setAllCheckList(result.data))
      .catch(error => console.log(error));
  }, []);

  const handleConfirm = () => {
    if (checkedReview.length === 0) {
      alert('체크된 리뷰가 없습니다. 체크 후 삭제 버튼을 클릭해 주세요!')
    } else {
      const deleteConfirm = window.confirm('정말로 삭제하시겠습니까?');
      if (deleteConfirm) {
        // 확인 버튼을 누르면 삭제 동작을 수행
        axios.delete(`${BASE_URL}/mypage/review/delete`, { data: { checkedReview, checkedReview2 }, })
          .then(result => {
            if (result.data === 'ok') {
              alert('삭제가 완료되었습니다!');
              window.location.reload();
            }
          })
          .catch(error => console.log(error));
      }
    }
  };

  const handleDelete = (review_id, orderDetailId) => {
    axios.delete(`${BASE_URL}/mypage/review/delete/${review_id}/${orderDetailId}`)
      .then(result => {
        if (result.data === 'ok') {
          alert('삭제가 완료되었습니다!');
          window.location.reload();
        }
      })
      .catch(error => console.log(error));
  };

  const params = {
    page: page,
    pageItem: 2,
    searchTerm: searchTerm,
    selectOption: selectOption
  };

  // 페이지별 리뷰 요청
  useEffect(() => {
    axios.get(`${BASE_URL}/mypage/review/${userid}`, { params })
      .then(result => {
        if (result.data.length > 0) {
          setReviewList(result.data);
          setTotalCount(result.data[0].total_rows);
          setNoSearchResult(false);
        } else {
          setNoSearchResult(true);
        }
      })
      .catch(error => console.log(error));
  }, [page, searchTerm, selectOption]);

  // 페이지 변경을 처리하는 함수
  const handleChange = (page) => {
    setPage(page);
  };

  // 수정 axios 요청 함수
  const handleUpdate = (review_id) => (e) => {
    const updateConfirm = window.confirm('등록하시겠습니까?');
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', review_id);
    formData.append('file', imageFile);
    formData.append('content', form['content']);
    formData.append('star', star);

    if (updateConfirm) {
      axios.post(`${BASE_URL}/mypage/review/update/`, formData)
        .then(result => {
          if (result.data === 'ok') {
            alert('공지사항 수정이 완료되었습니다.');
            window.location.reload();
          }
        }).catch(error => console.log(error));
    };
  };

  // 이미지 변경 처리 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedPreview(e.target.result);
      }
      reader.readAsDataURL(file);
    }
    setImageFile(file);
  };

  const handleFileButtonClick = () => {
    // 숨겨진 파일 input에 대해 클릭 이벤트
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // value값 유효성 검사
  const handleInput = (maxLength, setCountFn) => (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.value.length > maxLength) {
      alert(`${maxLength.toLocaleString()}자 이내로 작성해 주세요.`)
      e.target.value = e.target.value.slice(0, maxLength);
    }
    setCountFn(e.target.value.length);
  };

  // 각 리뷰의 수정 모드를 추적하기 위한 새로운 상태 변수 추가
  const [editMode, setEditMode] = useState({});

  // 특정 리뷰의 수정 모드를 토글하는 함수
  const handleEdit = (review_id) => {
    // 다른 리뷰의 editMode 중 하나라도 true이면 경고 메시지 표시
    // 현재 리뷰가 아니면서 조건이 true인 경우
    const otherEditModeExists = Object.values(editMode).some((value, id) => id !== review_id && value);

    if (otherEditModeExists) {
      alert('다른 리뷰의 수정 중에는 현재 리뷰를 수정할 수 없습니다.');
      return;
    }

    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [review_id]: !prevEditMode[review_id], // 수정 모드를 토글
    }));
  };

  const handleCloseEdit = (review_id) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [review_id]: false, // 현재 리뷰의 수정 모드를 닫음
    }));
    setForm({ content: '' });
    setInputCountContent(0);
    setImageFile(null);
    setSelectedPreview(null);
  };

  return (
    allCheckList.length !== 0 ?
      (<div className='submit_review'>
        {!noSearchResult ?
          <>
            <div className='review_all_delete'>
              <div>
                <input type='checkbox' id={'check_all'}
                  onChange={(e) => handleAllCheck(e.target.checked)}
                  checked={checkedReview.length} />
                <label htmlFor={`check_all`} ></label>
              </div>
              <button type='button' onClick={handleConfirm}>총 <strong>{checkedReview.length || '0'}</strong>개 전체 삭제</button>
            </div>
            <ul>
              {reviewList.map(myReview => (
                <li key={myReview.review_id}>
                  <div className='review_detail'>
                    <div className='review_detail_tab'>
                      <div>
                        <input type='checkbox' id={`check${myReview.no}`}
                          onChange={() => handleCheckedReview(myReview.review_id)}
                          checked={checkedReview.includes(myReview.review_id)} />
                        <label htmlFor={`check${myReview.no}`} ></label>
                        <p>{myReview.alcohol_name}</p>
                      </div>
                      <div>
                        <div className='review_star'>
                          {!editMode[myReview.review_id] ?
                            <>
                              <ReviewStar rating={myReview.review_star} />
                              <p>{myReview.review_star}</p>
                            </> : <StarInput star={myReview.review_star} fillstart={'rgb(177, 135, 28)'} setStar={setStar} />
                          }
                        </div>
                        <p>{myReview.review_date}</p>
                      </div>
                    </div>
                    <div className='review_detail_content'>
                      <div className='review_content_img'>
                        {!editMode[myReview.review_id] ? <p>{myReview.review_content}</p> :
                          <div className='review_content_editmode'>
                            <textarea name='content' id='review_content' form='review_form' rows='3'
                              placeholder={`${myReview.review_content} (500자 이내로 작성해 주세요.)`}
                              disabled={!editMode[myReview.review_id]}
                              onChange={handleInput(500, setInputCountContent)}
                              value={form.content}></textarea>
                            <div>
                              <span>{inputCountContent.toLocaleString()}</span>
                              <span>/500자</span>
                            </div>
                          </div>
                        }
                        {!editMode[myReview.review_id] ? <AlcoholAvata img={getImgUrl.review(myReview.review_img)} alt={myReview.review_img} /> :
                          <>
                            <input type='file'
                              ref={fileInputRef}
                              style={{ display: 'none' }}
                              onChange={handleImageChange}
                              accept='image/png, image/jpg, image/jpeg' />
                            <div className='img_update_btn'>
                              <button type='button' onClick={handleFileButtonClick}>
                                <AlcoholAvata img={selectedPreview || getImgUrl.review(myReview.review_img)} alt={myReview.review_img} />
                                <p><FaRegEdit /></p>
                              </button>
                            </div>
                          </>
                        }
                      </div>
                      <div className='edit_delete_btn'>
                        {!editMode[myReview.review_id] ? (
                          <button type='button' onClick={() => handleEdit(myReview.review_id)}>수정</button>
                        ) : (
                          <button type='button' onClick={() => handleCloseEdit(myReview.review_id)}>닫기</button>
                        )}
                        {!editMode[myReview.review_id] ? (
                          <button type='button' onClick={() => handleDelete(myReview.review_id, myReview.order_detail_id)}>삭제</button>
                        ) : (
                          <button type='button' onClick={handleUpdate(myReview.review_id)}>등록</button>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
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
          </> :
          <div className='no_review'>
            <figcaption><img src='/assets/images/etc/bubble-no-star.png' alt='no review' /></figcaption>
            <p>검색 결과가 없습니다 :(</p>
          </div>
        }
      </div>)
      : <NoReview ment='아직 작성한' />
  )
};