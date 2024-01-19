import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import BASE_URL from '../../../../constants/baseurl';
import axios from 'axios';
import AlcoholAvata from '../../../home/AlcoholAvata';
import StarInput from './StarInput';

export default function AddReviewModal({ setAddModal, selectedReviewId, selectedAcoholName, userId }) {
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({ orderDetailId: selectedReviewId, star: 0, content: '' });
  const [inputCountContent, setInputCountContent] = useState(0);
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [star, setStar] = useState(0);

  console.log("selectedReviewId:", selectedReviewId);


  const handleSubmit = (orderDetailId) => (e) => {
    e.preventDefault();
    const formData = new FormData();//전송할 바디를 만듬

    formData.append('orderDetailId', orderDetailId);
    formData.append('star', star);
    formData.append('file', imageFile);
    formData.append('content', form['content']);

    axios.post(`${BASE_URL}/mypage/review/insert/${userId}`, formData)
      .then(result => {
        if (result.data === 'ok') {
          alert('리뷰 등록이 완료되었습니다.');
          window.location.reload();
        }
      }).catch(error => console.log(error))
      ;

    setAddModal(false);
  };

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

  const handleInput = (maxLength, setCountFn) => (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
      alert(`${maxLength.toLocaleString()}자 이내로 작성해 주세요.`)
    }
    setCountFn(e.target.value.length);
  };

  return (
    <div className='modal_review_container'>
      <div className='modal_content add_modal'>
        <div className='select_alcohol_name'>
          <p>{selectedAcoholName}</p>
          <StarInput star='0' fillstart={'rgb(177, 135, 28)'} setStar={setStar} />
        </div>
        <div className='text_wrap'>
          <form id='notice_form' className='review_form' onSubmit={handleSubmit(selectedReviewId)}>
            <ul>
              <li>
                <label htmlFor='notice_image'>| 이미지</label>
                <input
                  type='file'
                  name='file'
                  id='notice_image'
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                  accept='image/png, image/jpg, image/jpeg'
                />
                <div className='selected_file'>
                  <p>선택된 파일: {imageFile ? imageFile.name : 'x'}</p>
                  <button
                    type='button'
                    className='custom_file_button'
                    onClick={handleFileButtonClick}>
                    <AlcoholAvata img={selectedPreview || 'assets/images/etc/noselect.png'} alt='noImg' />
                  </button>
                </div>
              </li>
              <li>
                <label htmlFor='ntoice_content'>| 리뷰 내용</label>
                <textarea name='content' id='ntoice_content' form='notice_form' rows='5'
                  placeholder={`content(20자이상 ${500}자 이내로 작성해 주세요.)`}
                  onChange={handleInput(500, setInputCountContent)}
                  value={form.content}></textarea>
              </li>
              <li>
                <span>{inputCountContent.toLocaleString()}</span>
                <span>/500자</span>
              </li>
            </ul>
            <div className='btn_wrap'>
              <button type='button' className='close_btn'
                onClick={() => setAddModal(false)}>닫기</button>
              <button className='add_btn' disabled={inputCountContent < 20}>확인</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}