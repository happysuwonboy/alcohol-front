import React, { useState } from 'react';
import axios from 'axios';
import { IoCamera } from 'react-icons/io5';
import { IoIosClose } from "react-icons/io";
import { GrPowerReset } from 'react-icons/gr';
import BASE_URL from '../../../constants/baseurl';

export default function ProductUpdateForm({updateClick, setUpdateClcik}) {
  const initialViewImg = ({ 0: '', 1: '', 2: ''});

  const [ foodViewImages, setFoodViewImages ] = useState(initialViewImg); // 미리보기, map 사용
  const [ alcoholViewImages, setAlcoholViewImages ] = useState(initialViewImg); // 미리보기, map 사용
  let [ foodImgFiles, setFoodImgFiles ] = useState(['', '', '']); // 서버 데이터용
  let [ alcoholImgFiles, setAlcoholImgFiles ] = useState(['', '', '']); // 서버 데이터용
  const [ duplicatedImages, setDuplicatedImages ] = useState(false); // food 이미지 중복 버튼 활성화

  const initialFormData = { // 서버에서 가져오는 값 필요 
    alcohol_name: { text: '', error: ''},
    alcohol_price: { text : '', error : '' },
    dc_percent: { text : '', error : '' },
    alcohol_type: { text : '', error : '' },
    abv: { text : '', error : '' },
    alcohol_volume: { text : '', error : '' },
    food1: { text : '', error : '' },
    food2: { text : '', error : '' },
    food3: { text : '', error : '' },
    alcohol_comment1: { text : '', error : '' },
    alcohol_comment2: { text : '', error : '' },
    flavor_sour: { text : '', error : '' },
    flavor_soda: { text : '', error : '' },
    flavor_sweet: { text : '', error : '' },
    flavor_body: { text : '', error : '' },
    hashtag: { text : '', error : '' },
    stock: { text : '', error : '' }
  }

  const [ formData, setFormData ] =  useState(initialFormData);

  // form 제출
  const handleSubmitRegister = (e) => {
    e.preventDefault();
    const passed = Object.values(formData).every(filed => filed.text !== '');
    // console.log(foodImgFiles);
    // console.log(alcoholImgFiles);

    if(passed && duplicatedImages) { // 모든 값이 들어 있는 경우
      const food = ['food1', 'food2', 'food3']
                    .map(food => formData[food].text)
                    .join('/');

      const confirm = window.confirm('상품을 등록하시겠습니까?');
      const newFormData = new FormData();
      if(confirm) {

        foodImgFiles.forEach((file, index) => {
          newFormData.append('food_img', file);
        });

        alcoholImgFiles.forEach((file, index) => {
          newFormData.append('alcohol_img', file);
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
        url: `${BASE_URL}/adminpage/product`,
        method: 'post',
        data: newFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'form-data'
        }
      })
      .then(result => {
        console.log(result)
      })
      .catch(error => console.log(error));
    } else {
      alert('양식에 맞춰 입력해주세요')
    }
  }

  // 등록 모달 닫기 클릭
  const handleClickClose = () => {
    document.body.style.overflow = 'auto'; // 윈도우 스크롤 생성
    // setRegisterBtnToggle(false);
    setUpdateClcik(false);
  };

  // 초기화 : 수정에서는 되돌리기로 할까..?
  const handleClickReset = () => {
    // 미리보기 이미지와 form 모든 값 초기화
    setFormData(initialFormData);
    setFoodImgFiles(['', '', '']);
    setFoodViewImages(initialViewImg);
    setAlcoholImgFiles(['', '', '']);
    setAlcoholViewImages(initialViewImg);
    setDuplicatedImages(false);
  }

  // 선택 이미지 중복 체크 ( 서버 가기 전 프론트에서의 파일명 중복 )
  const validateFoodImages = (currentFile) => {
    return foodImgFiles.some(imgFile => imgFile === currentFile);
  }

  // food 음식 이미지 미리보기
  const handleChangeFoodImg = (e, idx) => {
    console.log(e.target);
    const uploadFile = e.target.files[0]; // 업로드한 파일 가져오기

    if(uploadFile) {
      const reader = new FileReader(); // 파일 비동기적으로 읽어와 데이터 URI를 생성

      reader.onload = (e) => {
        const uploadFileName = uploadFile.name;
        if(validateFoodImages(uploadFileName)) {
          alert('중복된 이미지가 있습니다. 다시 올려주세요');
        } else {
          setFoodImgFiles(prev => {
            const newState = [...prev];
            newState[idx] = uploadFile;
            return newState;
          });
          setFoodViewImages(prev => ({
            ...prev,
            [idx]: e.target.result,
          }));
        }
      };
      reader.readAsDataURL(uploadFile); // 지정된 File 객체를 읽기 ( 파일을 Base64 인코딩된 데이터 URI로 읽어옴 )
    }
  };

  // // alcohol 상품 이미지 미리보기
  const handleChageAlcohol = (e, idx) => {
    const uploadFile = e.target.files[0];

    if(uploadFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAlcoholImgFiles(prev => {
          const newState = [...prev];
          newState[idx] = uploadFile;
          return newState;
        })
        setAlcoholViewImages(prev => ({
          ...prev,
          [idx]: e.target.result,
        }));
      };
      reader.readAsDataURL(uploadFile);
    }
  };

  // food 음식 이미지 중복 체크
  const handleClickImgCheck = (e) => {
    // console.log(foodImages);
    if(foodImgFiles.every(img => img !== '')) { // 이미지 3개 다 있는지 확인
      axios({
        url : `${BASE_URL}/adminpage/imgduplicate`,
        method : 'post',
        data : {foodImages: foodImgFiles}
      })
      .then(result => { // 중복 데이터 넘어옴

        if(result.data.duplicates) {
          setDuplicatedImages(false);
          alert('중복된 이미지가 있습니다. 다시 올려주세요');
          const deleteDupulicates = [...foodImgFiles]; // 배열 복사
          const deletVieweDupulicates = Object.assign({}, foodViewImages); // 객체 복사

          for(const list of result.data.duplicates) {
            deleteDupulicates[list.idx] = ''; // 중복 되는 이미지 비우기
            deletVieweDupulicates[list.idx] = '';
          };

          setFoodImgFiles(deleteDupulicates);
          setFoodViewImages(deletVieweDupulicates);
        } else {
          setDuplicatedImages(true);
        }
      })
      .catch(error => console.log(error));
    } else {
      alert('파일을 세개 다 올린 뒤 중복 체크를 확인해주세요');
    }
  };

  /* form 입력 핸들러 */
  const handleChangeName = (e) => {
    if(e.target.value.trim() !== '') {
      setFormData(prev => ({...prev, alcohol_name: { text: e.target.value, error: ''}}));
    } else {
      setFormData(prev => ({...prev, alcohol_name: { text: e.target.value, error: '이름을 입력해주세요'}}));
    }
  };

  const handleChangePrice = (e) => {
    const inputPrice = e.target.value;

    if (Number(inputPrice) >= 1 && inputPrice.trim() !== '') {
      setFormData(prev => ({...prev, alcohol_price: {text: inputPrice, error: ''}}));
    } else {
      setFormData(prev => ({...prev, alcohol_price: {text: '', error: '숫자를 입력해주세요'}}));
    }
  };

  const handleChangePercent = (e) => {
    const inputPercent = e.target.value;
    const numberInput = Number(inputPercent)

    if(numberInput >= 0 && numberInput <= 100 && inputPercent !== '') {
      setFormData(prev => ({...prev, dc_percent: {text: inputPercent, error: ''}}));
    }else {
      setFormData(prev => ({...prev, dc_percent: {text: '' , error: '0 - 100 사이의 숫자를 입력해주세요' }}));
    }
  };

  const handleChangeType = (e) => {
    if(e.target.value.trim() !== '') {
      setFormData(prev => ({ ...prev, alcohol_type: {text :e.target.value, error: '' } }));
    } else {
      setFormData(prev => ({ ...prev, alcohol_type: {text : '', error: '주종을 입력해주세요'} }));
    }
  }

  const handleChangeAbv = (e) => {
    const inputAbv = e.target.value;

    if (Number(inputAbv) >= 0 && inputAbv.trim() !== '') {
      setFormData(prev => ({ ...prev, abv: {text : inputAbv, error: '' }}));
    } else {
      setFormData(prev => ({ ...prev, abv: {text: '', error: '%를 제외한 소수점 숫자를 입력해주세요 (30.4)'} }));
    }
  };

  const handleChangeVolume = (e) => {
    const inputVloume = e.target.value;

    if (Number(inputVloume) >= 0 && inputVloume.trim() !== '') {
      setFormData(prev => ({ ...prev, alcohol_volume: inputVloume }));
    } else {
      setFormData(prev => ({ ...prev, alcohol_volume: {text: '', error: '단위를 제외한 숫자로 입력해주세요' } }));
    }
  };

  const handleChangeFood = (e, number) => {
    if(e.target.value !== '') {
      setFormData(prev => ({ ...prev, [`food${number}`] : {text: e.target.value, error: ''} }));
    } else {
      setFormData(prev => ({ ...prev, [`food${number}`] : {text: '', error: '음식을 입력해주세요'} }));
    }
  };

  const handleChangeComment = (e, number) => {
    if(e.target.value !== '' || e.target.value.length > 1000 ) {
      setFormData(prev => ({ ...prev, [`alcohol_comment${number}`] : {text: e.target.value, error: '' }}));
    } else {
      alert('1000자 이내의 상세 소개글을 적어주세요');
      setFormData(prev => ({ ...prev, [`alcohol_comment${number}`] : {text: '', error: '1000자 이내의 상세 소개글을 적어주세요' }}));
    }
  };

  const handleChangeFlavor = (e, type) => {
    const inputValue = e.target.value;
    const numberValue = Number(inputValue);

    if((numberValue >= 1 && numberValue <= 5 ) && inputValue !== '') {
      setFormData(prev => ({ ...prev, [`${type}`] : {text: inputValue, error: '' }}));
    } else {
      setFormData(prev => ({ ...prev, [`${type}`] : {text: '', error: '1 - 5 사이의 숫자를 입력해주세요' }}));
    }
  };

  const handleChangeTag = (e) => {
    if(e.target.value !== '' && e.target.value !== '' && !e.target.value.includes('#')) {
      setFormData(prev => ({ ...prev, hashtag: {text: e.target.value, error: '' }}));
    } else {
      setFormData(prev => ({ ...prev, hashtag: {text: '', error: '#을 제외한 해시태그를 적어주세요' }}));
    }
  };
  
  const handleChangeStock = (e) => {
    const inputStock = e.target.value;
    const numberStock = Number(inputStock);

    if(numberStock >= 1 && inputStock !== '' ) {
      setFormData(prev => ({ ...prev, stock: { text: inputStock, error: ''} }));
    } else {
      setFormData(prev => ({ ...prev, stock : {text: '', error: '숫자를 적어주세요'} }));
    }
  };
  

  return (
    <div className={`register_form_container ${updateClick ? 'toggle' : ''}`}>
      <div className='title_wrap'>
        <p>Product Update</p>
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
      <div className='register_form_wrap'>
        <form className='register_form' onSubmit={handleSubmitRegister} >
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
              <input value={formData.alcohol_price?.text} className={formData.alcohol_price.error && 'error'} type='text' id='alcohol_price' name='alcohol_price' placeholder='숫자를 입력해주세요' onChange={handleChangePrice} />
            </div>
            { formData.alcohol_price?.error && <span>{formData.alcohol_price.error}</span> }
          </div>

          <div className='percent'>
            <div className='text_box'>
              <label htmlFor='dc_percent'>할인율</label>
              <input value={formData.dc_percent?.text} className={formData.dc_percent.error && 'error'} type='text' id='dc_percent' name='dc_percent' placeholder='1 - 100사이 숫자를 입력해주세요' onChange={handleChangePercent}/>
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
              <input value={formData.abv?.text} className={formData.abv.error && 'error'} type='text' id='abv' name='abv'  placeholder='%를 제외한 소수점 숫자를 입력해주세요 (30.4)' maxLength={4} onChange={handleChangeAbv}/>
            </div>
          { formData.abv?.error && <span>{formData.abv.error}</span> }
          </div>

          <div className='volume'>
            <div className='text_box'>
              <label htmlFor='alcohol_volume'>용량</label>
              <input value={formData.alcohol_volume?.text} className={formData.alcohol_volume.error && 'error'}  type='text' id='alcohol_volume' name='alcohol_volume' placeholder='단위를 제외한 숫자로 입력해주세요' onChange={handleChangeVolume}/>
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
                    <input type='file' accept='image/*' id={`food_img${idx}`} name={`food_img${idx}`} onChange={(e) => handleChangeFoodImg(e, idx)} />
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
              <input value={formData.food1?.text} className={formData.food1.error && 'error'} type='text' id='food_1' name='food_1' placeholder='음식을 입력해주세요' onChange={(e) => handleChangeFood(e, 1)}/>
            </div>
            { formData.food1?.error && <span>{formData.food1.error}</span> }
          </div>

          <div className='food_2'>
            <div className='text_box'>
              <label htmlFor='food_2'>음식2</label>
              <input value={formData.food2?.text} className={formData.food2.error && 'error'} type='text' id='food_2' name='food_2' placeholder='음식을 입력해주세요'onChange={(e) => handleChangeFood(e, 2)}/>
            </div>
            { formData.food2?.error && <span>{formData.food2.error}</span> }
          </div>

          <div className='food_3'>
            <div className='text_box'>
              <label htmlFor='food_3'>음식3</label>
              <input value={formData.food3?.text} className={formData.food3.error && 'error'} type='text' id='food_3' name='food_3' placeholder='음식을 입력해주세요' onChange={(e) => handleChangeFood(e, 3)}/>
            </div>
            { formData.food3?.error && <span>{formData.food3.error}</span> }
          </div>

          <div className='comment_1'>
            <div className='write_box'>
              <label htmlFor='alcohol_comment1'>상품 소개1</label>
              <textarea value={formData.alcohol_comment1?.text} className={formData.alcohol_comment1.error && 'error'} name='alcohol_comment1' id='alcohol_comment1' color='30' rows='5' maxLength='1000' placeholder='문장을 /로 구분해주세요' onChange={(e) => handleChangeComment(e, 1)} ></textarea>
            {/* <input type='text' id='alcohol_comment1' name='alcohol_comment1' placeholder='문장을 /로 구분해주세요' /> */}
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
            {/* <input type='text' id='alcohol_comment1' name='alcohol_comment1' placeholder='문장을 /로 구분해주세요' /> */}
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
                    <input type='file' accept='image/*' id={`alcohol_img${idx}`} name={`alcohol_img${idx}`} onChange={(e) => handleChageAlcohol(e, idx)}/>
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
              <input value={formData.hashtag.text} className={formData.hashtag.error && 'error'} type='text' id='hashtag' name='hashtag' placeholder='#을 제외하고 넣어주세요' onChange={handleChangeTag}/>
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

          <div className='register_btn'>
            <button>등록하기</button>
          </div>

        </form>
      </div>

    </div>
  )
};