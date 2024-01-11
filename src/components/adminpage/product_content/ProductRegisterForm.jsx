import React, { useState } from 'react';
import axios from 'axios';
import { IoCamera } from 'react-icons/io5';
import { IoIosClose } from "react-icons/io";
import { GrPowerReset } from 'react-icons/gr';
import BASE_URL from '../../../constants/baseurl';
import useProduct from '../../../hooks/useProduct';

export default function ProductRegisterForm({registerBtnToggle, setRegisterBtnToggle}) {
  const [foodViewImages, alcoholViewImages, foodImgFiles, alcoholImgFiles, duplicatedImages, formData, setFormData, setFoodViewImages, setAlcoholViewImages, setFoodImgFiles, setAlcoholImgFiles, handleClickClose, handleClickReset, handleChangeFoodImges,  handleChageAlcoholImges, handleClickImgCheck, handleChangeName, handleChangePrice, handleChangePercent, handleChangeType, handleChangeAbv, handleBlurAbv, handleChangeVolume, handleChangeComment, handleChangeFlavor, handleChangeTag, handleChangeStock, resetForm ] = useProduct(setRegisterBtnToggle);

  // form 제출
  const handleSubmitRegister = (e) => {
    e.preventDefault();
    const passed = Object.values(formData).every(filed => filed.text !== '');

    if(passed && duplicatedImages) { // 모든 값이 들어 있는 경우
      const food = ['food1', 'food2', 'food3']
                    .map(food => formData[food].text)
                    .join('/');

      const confirm = window.confirm('상품을 등록하시겠습니까?');
      const newFormData = new FormData();
      if(confirm) {

        foodImgFiles.forEach((file, idx) => {
          newFormData.append('food_img', file);
        });

        alcoholImgFiles.forEach((file, idx) => {
          newFormData.append(`alcohol_img${idx}`, file);
        });

        newFormData.append('alcohol_name', formData.alcohol_name.text);
        newFormData.append('alcohol_price', formData.alcohol_price.text);
        newFormData.append('dc_percent', formData.dc_percent.text);
        newFormData.append('alcohol_type', formData.alcohol_type.text);
        newFormData.append('abv', formData.abv.text);
        newFormData.append('alcohol_volume', formData.alcohol_volume.text);
        newFormData.append('food', food);
        newFormData.append('alcohol_comment1', formData.alcohol_comment1.text);
        newFormData.append('alcohol_comment2', formData.alcohol_comment2.text);
        newFormData.append('flavor_sour', formData.flavor_sour.text);
        newFormData.append('flavor_soda', formData.flavor_soda.text);
        newFormData.append('flavor_sweet', formData.flavor_sweet.text);
        newFormData.append('flavor_body', formData.flavor_body.text);
        newFormData.append('hashtag', formData.hashtag.text);
        newFormData.append('stock', formData.stock.text);
      }
      axios({
        url: `${BASE_URL}/adminpage/product/create`,
        method: 'post',
        data: newFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'form-data'
        }
      })
      .then(result => {
        if(result.data === 'insert ok') {
          resetForm();
          alert('상품 등록이 완료되었습니다');
        } else {
          alert('상품 등록이 실패하였습니다');
        }
      })
      .catch(error => console.log(error));
    } else {
      alert('이미지 중복체크와 form 양식에 맞춰 입력해주세요');
    }
  }

  return (
    <div className={`product_form_container ${registerBtnToggle ? 'toggle' : ''}`}>
      <div className='title_wrap'>
        <p>Product Register</p>
        <div className='btn_wrap'>
          <div className='reset_btn' onClick={handleClickReset} >
            <GrPowerReset />
            <button type='button'>초기화</button>
          </div>
          <div className='close_btn' onClick={handleClickClose}>
            <IoIosClose />
            <button type='button'>닫기</button>
          </div>
        </div>
      </div>
      <div className='product_form_wrap'>
        <form className='product_form' onSubmit={handleSubmitRegister} >
          <div className='name'>
            <div className='text_box'>
            <label htmlFor='alcohol_name'>이름</label>
            <input value={formData.alcohol_name?.text} className={formData.alcohol_name.error && 'error'} type='text' id='alcohol_name' name='alcohol_name' placeholder='상품 이름을 입력해주세요' onChange={handleChangeName} />
            </div>
            { formData.alcohol_name?.error && <span>{formData.alcohol_name.error}</span> }
          </div>

          <div className='price'>
            <div className='text_box'>
              <label htmlFor='alcohol_price'>가격</label>
              <input value={formData.alcohol_price?.text} className={formData.alcohol_price.error && 'error'} type='text' id='alcohol_price' name='alcohol_price' placeholder='50만원 이하의 숫자를 입력해주세요' onChange={handleChangePrice} />
            </div>
            { formData.alcohol_price?.error && <span>{formData.alcohol_price.error}</span> }
          </div>

          <div className='percent'>
            <div className='text_box'>
              <label htmlFor='dc_percent'>할인율</label>
              <input value={formData.dc_percent?.text} className={formData.dc_percent.error && 'error'} type='text' id='dc_percent' name='dc_percent' placeholder='1 - 100사이 숫자를 입력해주세요' maxLength={3}  onChange={handleChangePercent}/>
            </div>
          { formData.dc_percent?.error && <span>{formData.dc_percent.error}</span> }
          </div>

          <div className='type'>
            <div className='text_box'>
              <label htmlFor='alcohol_type'>주종</label>
              <input value={formData.alcohol_type?.text} type='text' id='alcohol_type' name='alcohol_type'  placeholder='상품의 주종을 입력해주세요' onChange={handleChangeType}/>
            </div>
          { formData.alcohol_type?.error && <span>{formData.alcohol_type.error}</span> }
          </div>

          <div className='abv'>
            <div className='text_box'>
              <label htmlFor='abv'>도수</label>
              <input value={formData.abv?.text} className={formData.abv.error && 'error'} type='text' id='abv' name='abv'  placeholder='%를 제외한 소수점 숫자를 입력해주세요 (30.4)' maxLength={4} onChange={handleChangeAbv} onBlur={handleBlurAbv}/>
            </div>
          { formData.abv?.error && <span>{formData.abv.error}</span> }
          </div>

          <div className='volume'>
            <div className='text_box'>
              <label htmlFor='alcohol_volume'>용량</label>
              <input value={formData.alcohol_volume?.text} className={formData.alcohol_volume.error && 'error'}  type='text' id='alcohol_volume' name='alcohol_volume' placeholder='ml 단위를 제외한 2000이하 숫자로 입력해주세요' maxLength={4} onChange={handleChangeVolume}/>
            </div>
          { formData.alcohol_volume?.error && <span>{formData.alcohol_volume.error}</span>}
          </div>

          <div className='food_img_container img_common'>
            <div className='label'>
              <p>음식 이미지</p>
              <span>* 파일 이름 : [음식이름.확장자명] + 이미지 중복 체크 필수</span>
            </div>
            <div className='img_box_wrap'>
              <div className='box_wrap'>
              { Object.keys(foodViewImages).map((idx) => (
                <div className='food_box' key={idx}>
                  <p>음식 {parseInt(idx) + 1}</p>
                  <div className='img_box'>
                    <div>
                      <img src={foodViewImages[idx] || 'assets/images/etc/default.png'} alt={`음식 상품 이미지 ${parseInt(idx, 10) + 1}`} />
                    </div>
                    <label htmlFor={`food_img${idx}`}><IoCamera/></label>
                    <input type='file' accept='image/*' id={`food_img${idx}`} name={`food_img${idx}`} onChange={(e) => handleChangeFoodImges(e, idx)} />
                  </div>
                  </div>)) } 
              </div>
              <button type='button' 
                      onClick={() => handleClickImgCheck('food')}
                      className={`${duplicatedImages ? 'visible' : ''}`}>{ duplicatedImages ?  '중복 이미지가 없습니다' : '중복 체크' }</button>
            </div>
          </div>

          <div className='food_1'>
            <div className='text_box'>
              <label htmlFor='food_1'>음식1</label>
              <input value={formData.food1?.text} readOnly className={formData.food1.error && 'error'} type='text' id='food_1' name='food_1' placeholder='사진을 업로드하면 자동으로 입력됩니다'/>
            </div>
            { formData.food1?.error && <span>{formData.food1.error}</span> }
          </div>

          <div className='food_2'>
            <div className='text_box'>
              <label htmlFor='food_2'>음식2</label>
              <input value={formData.food2?.text}  readOnly className={formData.food2.error && 'error'} type='text' id='food_2' name='food_2' placeholder='사진을 업로드하면 자동으로 입력됩니다'/>
            </div>
            { formData.food2?.error && <span>{formData.food2.error}</span> }
          </div>

          <div className='food_3'>
            <div className='text_box'>
              <label htmlFor='food_3'>음식3</label>
              <input value={formData.food3?.text} readOnly className={formData.food3.error && 'error'} type='text' id='food_3' name='food_3' placeholder='사진을 업로드하면 자동으로 입력됩니다'/>
            </div>
            { formData.food3?.error && <span>{formData.food3.error}</span> }
          </div>

          <div className='comment_1'>
            <div className='write_box'>
              <label htmlFor='alcohol_comment1'>상품 소개1</label>
              <textarea value={formData.alcohol_comment1?.text} className={formData.alcohol_comment1.error && 'error'} name='alcohol_comment1' id='alcohol_comment1' color='30' rows='5' maxLength='1000' placeholder='문장을 /로 구분해주세요' onChange={(e) => handleChangeComment(e, 1)} ></textarea>
            </div>
            <div className='text_length_box'>
            { formData.alcohol_comment1?.error && <span>{formData.alcohol_comment1.error}</span> }
            <div>
              <span>{formData.alcohol_comment1?.text.length}/</span>
              <span>1000</span>

            </div>
            </div>
          </div>

          <div className='comment_2'>
            <div className='write_box'>
              <label htmlFor='alcohol_comment2'>상품 소개2</label>
              <textarea value={formData.alcohol_comment2?.text} className={formData.alcohol_comment2.error && 'error'} name='alcohol_comment2' id='alcohol_comment2' color='30' rows='5' maxLength='1000' placeholder='문장을 /로 구분해주세요' onChange={(e) => handleChangeComment(e, 2)} ></textarea>
            </div>
            <div className='text_length_box'>
            { formData.alcohol_comment2?.error && <span>{formData.alcohol_comment2.error}</span> }
              <div>
                <span>{formData.alcohol_comment2?.text.length}/</span>
                <span>1000</span>
              </div>
            </div>
          </div>

          <div className='alcohol_img_container img_common'>
            <div className='label'>
              <p>상품 이미지</p>
            </div>

            <div className='img_box_wrap'>
              <div className='box_wrap'>
              { Object.keys(alcoholViewImages).map(idx => (
                <div className='alcohol_box' key={idx}>
                  <p>상품 이미지 {parseInt(idx) + 1}</p>
                  <div className='img_box'>
                    <div>
                      <img src={ alcoholViewImages[idx] || 'assets/images/etc/default.png'} alt='상품 이미지' />
                    </div>
                    <label htmlFor={`alcohol_img${idx}`} ><IoCamera/></label>
                    <input type='file' accept='image/*' id={`alcohol_img${idx}`} name={`alcohol_img${idx}`} onChange={(e) => handleChageAlcoholImges(e, idx)}/>
                  </div>
                </div>)) }
              </div>
            </div>
          </div>

          <div className='sour'>
            <div className='text_box'>
              <label htmlFor='flavor_sour'>신맛</label>
              <input value={formData.flavor_sour.text} className={formData.flavor_sour.error && 'error'} type='text' id='flavor_sour' name='flavor_sour' placeholder='1 - 5 사이로 입력해주세요' onChange={(e) => handleChangeFlavor(e, 'flavor_sour')}/>
            </div>
            { formData.flavor_sour?.error && <span>{formData.flavor_sour.error}</span> }
          </div>

          <div className='soda'>
            <div className='text_box'>
              <label htmlFor='flavor_soda'>탄산</label>
              <input value={formData.flavor_soda.text} className={formData.flavor_soda.error && 'error'} type='text' id='flavor_soda' name='flavor_soda' placeholder='1 - 5 사이로 입력해주세요' onChange={(e) => handleChangeFlavor(e, 'flavor_soda')}/>
            </div>
            { formData.flavor_soda?.error && <span>{formData.flavor_soda.error}</span> }
          </div>

          <div className='sweet'>
            <div className='text_box'>
              <label htmlFor='flavor_sweet'>단맛</label>
              <input value={formData.flavor_sweet.text} className={formData.flavor_sweet.error && 'error'} type='text' id='flavor_sweet' name='flavor_sweet' placeholder='1 - 5 사이로 입력해주세요' onChange={(e) => handleChangeFlavor(e, 'flavor_sweet')}/>
            </div>
            { formData.flavor_sweet?.error && <span>{formData.flavor_sweet.error}</span> }
          </div>

          <div className='body'>
            <div className='text_box'>
              <label htmlFor='flavor_sweet'>바디</label>
              <input value={formData.flavor_body.text} className={formData.flavor_body.error && 'error'} type='text' id='flavor_body' name='flavor_body' placeholder='1 - 5 사이로 입력해주세요' onChange={(e) => handleChangeFlavor(e, 'flavor_body')}/>
            </div>
            { formData.flavor_body?.error && <span>{formData.flavor_body.error}</span> }
          </div>


          <div className='hashtag'>
            <div className='text_box'>
              <label htmlFor='hashtag'>#태그</label>
              <input value={formData.hashtag.text} className={formData.hashtag.error && 'error'} type='text' id='hashtag' name='hashtag' placeholder='#을 제외하고 20자 이하로 넣어주세요' maxLength={20} onChange={handleChangeTag}/>
            </div>
            { formData.hashtag?.error && <span>{formData.hashtag.error}</span> }
          </div>

          <div className='stock'>
            <div className='text_box'>
              <label htmlFor='stock'>재고</label>
              <input value={formData.stock.text} className={formData.stock.error && 'error'} type='text' id='stock' name='stock' placeholder='숫자로 입력해주세요' onChange={handleChangeStock}/>
            </div>
            { formData.stock?.error && <span>{formData.stock.error}</span> }
          </div>

          <div className='product_btn'>
            <button>등록하기</button>
          </div>

        </form>
      </div>

    </div>
  )
};