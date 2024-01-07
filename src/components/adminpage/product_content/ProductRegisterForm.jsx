import React, { useState } from 'react';
import { IoCamera } from 'react-icons/io5';
import { IoIosClose } from "react-icons/io";

export default function ProductRegisterForm({registerBtnToggle, setRegisterBtnToggle}) {
  const [ foodViewImg, setFoodViewImg ] = useState({ 0: '', 1: '', 2: ''});
  const [ alcoholViewImg, setAlcoholViewImg ] = useState({ 0: '', 1: '', 2: ''});
  const [ foodImg, setFoodImg ] = useState([]);
  const [ alcoholImg, setAlcoholImg ] = useState([]);

  // 등록 모달 닫기 클릭
  const handleClickClose = () => {
    document.body.style.overflow = 'auto'; // 윈도우 스크롤 생성
    setRegisterBtnToggle(false);
  };

  // food 음식 이미지 미리보기
  const handleChangeFoodImg = (e, idx) => {
    const uplodaFile = e.target.files[0]; // 업로드한 파일 가져오기

    if(uplodaFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFoodImg(prev => [...prev, uplodaFile]);
        setFoodViewImg(prev => ({
          ...prev,
          [idx]: e.target.result,
        }));
      };
      reader.readAsDataURL(uplodaFile);
    }
  };

  // alcohol 상품 이미지 미리보기
  const handleChageAlcohol = (e, idx) => {
    console.log(e.target);
    const uploadFile = e.target.files[0];

    if(uploadFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAlcoholImg(prev => [...prev, uploadFile]);
        setAlcoholViewImg(prev => ({
          ...prev,
          [idx]: e.target.result,
        }));
      };
      reader.readAsDataURL(uploadFile);
    }
  };
  

  return (
    <div className={`register_form_container ${registerBtnToggle ? 'toggle' : ''}`}>
      <div className='title_wrap'>
        <p>Product Register</p>
        <div className='close_btn' onClick={handleClickClose}>
          <IoIosClose />
          <button type='button'>닫기</button>
        </div>
      </div>
      <div className='register_form_wrap'>
        <form className='register_form'> {/* onsubmit 추가 */}
          <div className='name'>
            <label htmlFor='alcohol_name'>이름</label>
            <input type='text' id='alcohol_name' name='alcohol_name' placeholder='상품 이름을 입력해주세요'/>
          </div>

          <div className='price'>
            <label htmlFor='alcohol_price'>가격</label>
            <input type='text' id='alcohol_price' name='alcohol_price' placeholder='숫자를 입력해주세요' />
          </div>

          <div className='percent'>
            <label htmlFor='dc_percent'>가격</label>
            <input type='text' id='dc_percent' name='dc_percent' placeholder='1 - 100사이 숫자를 입력해주세요' />
          </div>

          <div className='type'>
            <label htmlFor='alcohol_type'>주종</label>
            <input type='text' id='alcohol_type' name='alcohol_type'  placeholder='상품의 주종을 입력해주세요'/>
          </div>

          <div className='abv'>
            <label htmlFor='abv'>도수</label>
            <input type='text' id='abv' name='abv'  placeholder='%를 제외한 숫자를 입력해주세요'/>
          </div>

          <div className='volume'>
            <label htmlFor='alcohol_volume'>용량</label>
            <input type='text' id='alcohol_volume' name='alcohol_volume' placeholder='숫자를 입력해주세요' />
          </div>

          {/* food 이미지 체크 구간 필요 */}
          <div className='food_img_container img_common'>
            <div className='label'>
              <p>음식 이미지</p>
              <span>* 이미지 중복 시 먼저 업로드 되어 있던 이미지로 적용됩니다</span>
            </div>
            <div className='img_box_wrap'>
            { Object.keys(foodViewImg).map((idx) => (
              <div className='food_box' key={idx}>
                <p>음식 {parseInt(idx) + 1}</p>
                <div className='img_box'>
                  <div>
                    <img src={foodViewImg[idx] || 'assets/images/etc/default.png'} alt={`음식 상품 이미지 ${parseInt(idx, 10) + 1}`} />
                  </div>
                  <label htmlFor={`food_img${idx}`}><IoCamera/></label>
                  <input type='file' accept='image/*' id={`food_img${idx}`} name={`food_img${idx}`} onChange={(e) => handleChangeFoodImg(e, idx)} />
                </div>
                </div>)) } 
            </div>
          </div>

          <div className='food_1'>
            <label htmlFor='food_1'>음식1</label>
            <input type='text' id='food_1' name='food_1' placeholder='/를 붙여주세요' />
          </div>

          <div className='food_2'>
            <label htmlFor='food_2'>음식2</label>
            <input type='text' id='food_1' name='food_1' placeholder='/를 붙여주세요' />
          </div>

          <div className='food_3'>
            <label htmlFor='food_3'>음식3</label>
            <input type='text' id='food_3' name='food_3' placeholder='/ 없이 입력해주세요' />
          </div>

          <div className='comment_1'>
            <label htmlFor='alcohol_comment1'>상품 소개1</label>
            <textarea name='alcohol_comment1' id='alcohol_comment1' color='30' rows='5' placeholder='문장을 /로 구분해주세요' ></textarea>
            {/* <input type='text' id='alcohol_comment1' name='alcohol_comment1' placeholder='문장을 /로 구분해주세요' /> */}
          </div>

          <div className='comment_2'>
            <label htmlFor='alcohol_comment2'>상품 소개2</label>
            <textarea name='alcohol_comment2' id='alcohol_comment2' color='30' rows='5' placeholder='문장을 /로 구분해주세요' ></textarea>
            {/* <input type='text' id='alcohol_comment2' name='alcohol_comment2' placeholder='문장을 /로 구분해주세요' /> */}
          </div>

          <div className='alcohol_img_container img_common'>
            <div className='label'>
              <p>상품 이미지</p>
              <span>* 이미지 중복 시 먼저 업로드 되어 있던 이미지로 적용됩니다</span>
            </div>

            <div className='img_box_wrap'>
            { Object.keys(alcoholViewImg).map(idx => (
              <div className='alcohol_box'>
                <p>상품 이미지 {parseInt(idx) + 1}</p>
                <div className='img_box'>
                  <div>
                    <img src={ alcoholViewImg[idx] || 'assets/images/etc/default.png '} alt='상품 이미지' />
                  </div>
                  <label htmlFor={`alcohol_img${idx}`} ><IoCamera/></label>
                  <input type='file' accept='image/*' id={`alcohol_img${idx}`} name={`alcohol_img${idx}`} onChange={(e) => handleChageAlcohol(e, idx)}/>
                </div>
              </div>)) }
            </div>
          </div>

          <div className='sour'>
            <label htmlFor='flavor_sour'>탄산</label>
            <input type='text' id='flavor_sour' name='flavor_sour' placeholder='1 - 5 사이로 입력해주세요' />
          </div>

          <div className='soda'>
            <label htmlFor='flavor_soda'>탄산</label>
            <input type='text' id='flavor_soda' name='flavor_soda' placeholder='1 - 5 사이로 입력해주세요' />
          </div>

          <div className='sweet'>
            <label htmlFor='flavor_sweet'>단맛</label>
            <input type='text' id='flavor_sweet' name='flavor_sweet' placeholder='1 - 5 사이로 입력해주세요' />
          </div>

          <div className='body'>
            <label htmlFor='body'>바디</label>
            <input type='text' id='body' name='body' placeholder='1 - 5 사이로 입력해주세요' />
          </div>

          <div className='hashtag'>
            <label htmlFor='hashtag'>해시태그</label>
            <input type='text' id='hashtag' name='hashtag' placeholder='1 - 5 사이로 입력해주세요' />
          </div>

          <div className='stock'>
            <label htmlFor='stock'>재고</label>
            <input type='text' id='stock' name='stock' placeholder='숫자로 입력해주세요' />
          </div>

          <div className='register_btn'>
            <button>등록하기</button>
          </div>

        </form>
      </div>

    </div>
  )
};