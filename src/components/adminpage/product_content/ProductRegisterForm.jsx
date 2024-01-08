import React, { useState } from 'react';
import { IoCamera } from 'react-icons/io5';
import { IoIosClose } from "react-icons/io";

export default function ProductRegisterForm({registerBtnToggle, setRegisterBtnToggle}) {
  const [ foodViewImg, setFoodViewImg ] = useState({ 0: '', 1: '', 2: ''}); // 미리보기, map 사용
  const [ alcoholViewImg, setAlcoholViewImg ] = useState({ 0: '', 1: '', 2: ''}); // 미리보기, map 사용
  const [ foodImg, setFoodImg ] = useState([]);
  const [ alcoholImg, setAlcoholImg ] = useState([]);
  const [ formData, setFormData ] =  useState({
    alcohol_name: '',
    alcohol_price: '',
    dc_percent: '',
    alcohol_type: '',
    abv: '',
    alcohol_volume: '',
    food1: '',
    food2: '',
    food3: '',
    alcohol_comment1: '',
    alcohol_comment2: '',
    flavor_sour: '',
    flavor_soda: '',
    flavor_sweet: '',
    flavor_body: '',
    hashtag: '',
    stock: '',
  });

  // 등록 모달 닫기 클릭
  const handleClickClose = () => {
    document.body.style.overflow = 'auto'; // 윈도우 스크롤  s생성
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

  /* form 입력 핸들러 */
  const handleChangeName = (e) => {
    if(e.target.value.trim() !== '') {
      setFormData(prev => ({...prev, alcohol_name: e.target.value}));
    } else {
      alert('이름을 입력해주세요');
      setFormData(prev => ({...prev, alcohol_name: ''}));
    }
  };

  const handleChangePrice = (e) => {
    const inputPrice = e.target.value;

    if (Number(inputPrice) >= 1 && inputPrice.trim() !== '') {
      setFormData(prev => ({...prev, alcohol_price: inputPrice}));
    } else {
      alert('숫자를 입력해주세요');
      setFormData(prev => ({...prev, alcohol_price: ''}));
    }
  };

  const handleChangePercent = (e) => {
    const inputPercent = e.target.value;
    const numberInput = Number(inputPercent)

    if(numberInput >= 0 && numberInput <= 100 && inputPercent !== '') {
      setFormData(prev => ({...prev, dc_percent: inputPercent}));
    }else {
      alert('0 - 100 사이의 숫자를 입력해주세요');
      setFormData(prev => ({...prev, dc_percent: ''}));
    }
  };

  const handleChangeType = (e) => {
    if(e.target.value.trim() !== '') {
      setFormData(prev => ({ ...prev, alcohol_type: e.target.value }));
    } else {
      alert('주종을 입력해주세요');
      setFormData(prev => ({ ...prev, alcohol_type: '' }));
    }
  }

  const handleChangeAbv = (e) => {
    const inputAbv = e.target.value;

    if (Number(inputAbv) >= 0 && inputAbv.trim() !== '') {
      setFormData(prev => ({ ...prev, abv: inputAbv }));
    } else {
      alert('%를 제외한 숫자로 입력해주세요');
      setFormData(prev => ({ ...prev, abv: '' }));
    }
  };

  const handleChangeVolume = (e) => {
    const inputVloume = e.target.value;

    if (Number(inputVloume) >= 0 && inputVloume.trim() !== '') {
      setFormData(prev => ({ ...prev, alcohol_volume: inputVloume }));
    } else {
      alert('단위를 제외한 숫자로 입력해주세요');
      setFormData(prev => ({ ...prev, alcohol_volume: '' }));
    }
  };

  const handleChangeFood = (e, number) => {
    if(e.target.value !== '') {
      setFormData(prev => ({ ...prev, [`food${number}`] : e.target.value }));
    } else {
      alert('음식을 입력해주세요');
      setFormData(prev => ({ ...prev, [`food${number}`] : '' }));
    }
  };

  const handleChangeComment = (e, number) => {
    if(e.target.value !== '') {
      setFormData(prev => ({ ...prev, [`alcohol_comment${number}`] : e.target.value }));
    } else {
      alert('상세 소개글을 적어주세요');
      setFormData(prev => ({ ...prev, [`alcohol_comment${number}`] : '' }));
    }
  };

  const handleChangeFlavor = (e, type) => {
    const inputValue = e.target.value;
    const numberValue = Number(inputValue);

    if((numberValue >= 1 || numberValue <= 5 ) && inputValue !== '') {
      setFormData(prev => ({ ...prev, [`${type}`] : inputValue }));
    } else {
      alert('1 - 5 사이의 숫자를 입력해주세요');
      setFormData(prev => ({ ...prev, [`${type}`] : '' }));
    }
  };

  const handleChangeTag = (e) => {
    if(e.target.value !== '' && e.target.value !== '' && !e.target.value.includes('#')) {
      setFormData(prev => ({ ...prev, hashtag: e.target.value }));
    } else {
      alert('#를 제외한 해시태그를 적어주세요');
      setFormData(prev => ({ ...prev, hashtag: '' }));
    }
  };
  
  const handleChangeStock = (e) => {
    const inputStock = e.target.value;
    const numberStock = Number(inputStock);

    if(numberStock >= 1 && inputStock !== '' ) {
      setFormData(prev => ({ ...prev, stock: inputStock }));
    } else {
      alert('숫자를 적어주세요');
      setFormData(prev => ({ ...prev, stock : '' }));
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
            <input value={formData.alcohol_name} type='text' id='alcohol_name' name='alcohol_name' placeholder='상품 이름을 입력해주세요' onChange={handleChangeName} />
          </div>

          <div className='price'>
            <label htmlFor='alcohol_price'>가격</label>
            <input value={formData.alcohol_price} type='text' id='alcohol_price' name='alcohol_price' placeholder='숫자를 입력해주세요' onChange={handleChangePrice} />
          </div>

          <div className='percent'>
            <label htmlFor='dc_percent'>할인율</label>
            <input value={formData.dc_percent} type='text' id='dc_percent' name='dc_percent' placeholder='1 - 100사이 숫자를 입력해주세요' onChange={handleChangePercent}/>
          </div>

          <div className='type'>
            <label htmlFor='alcohol_type'>주종</label>
            <input value={formData.alcohol_type} type='text' id='alcohol_type' name='alcohol_type'  placeholder='상품의 주종을 입력해주세요' onChange={handleChangeType}/>
          </div>

          <div className='abv'>
            <label htmlFor='abv'>도수</label>
            <input value={formData.abv} type='text' id='abv' name='abv'  placeholder='%를 제외한 숫자를 입력해주세요' onChange={handleChangeAbv}/>
          </div>

          <div className='volume'>
            <label htmlFor='alcohol_volume'>용량</label>
            <input value={formData.alcohol_volume} type='text' id='alcohol_volume' name='alcohol_volume' placeholder='단위를 제외한 숫자로 입력해주세요' onChange={handleChangeVolume}/>
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
            <input value={formData.food1} type='text' id='food_1' name='food_1' placeholder='음식을 입력해주세요' onChange={(e) => handleChangeFood(e, 1)}/>
          </div>

          <div className='food_2'>
            <label htmlFor='food_2'>음식2</label>
            <input value={formData.food2} type='text' id='food_2' name='food_2' placeholder='음식을 입력해주세요'onChange={(e) => handleChangeFood(e, 2)}/>
          </div>

          <div className='food_3'>
            <label htmlFor='food_3'>음식3</label>
            <input value={formData.food3} type='text' id='food_3' name='food_3' placeholder='음식을 입력해주세요' onChange={(e) => handleChangeFood(e, 3)}/>
          </div>

          <div className='comment_1'>
            <label htmlFor='alcohol_comment1'>상품 소개1</label>
            <textarea value={formData.alcohol_comment1} name='alcohol_comment1' id='alcohol_comment1' color='30' rows='5' placeholder='문장을 /로 구분해주세요' onChange={(e) => handleChangeComment(e, 1)} ></textarea>
            {/* <input type='text' id='alcohol_comment1' name='alcohol_comment1' placeholder='문장을 /로 구분해주세요' /> */}
          </div>

          <div className='comment_2'>
            <label htmlFor='alcohol_comment2'>상품 소개2</label>
            <textarea value={formData.alcohol_comment2} name='alcohol_comment2' id='alcohol_comment2' color='30' rows='5' placeholder='문장을 /로 구분해주세요' ></textarea>
            {/* <input type='text' id='alcohol_comment2' name='alcohol_comment2' placeholder='문장을 /로 구분해주세요' /> */}
          </div>

          <div className='alcohol_img_container img_common'>
            <div className='label'>
              <p>상품 이미지</p>
              <span>* 이미지 중복 시 먼저 업로드 되어 있던 이미지로 적용됩니다</span>
            </div>

            <div className='img_box_wrap'>
            { Object.keys(alcoholViewImg).map(idx => (
              <div className='alcohol_box' key={idx}>
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
            <label htmlFor='flavor_sour'>신맛</label>
            <input value={formData.flavor_sour} type='text' id='flavor_sour' name='flavor_sour' placeholder='1 - 5 사이로 입력해주세요' onChange={(e) => handleChangeFlavor(e, 'flavor_sour')}/>
          </div>

          <div className='soda'>
            <label htmlFor='flavor_soda'>탄산</label>
            <input value={formData.flavor_soda} type='text' id='flavor_soda' name='flavor_soda' placeholder='1 - 5 사이로 입력해주세요' onChange={(e) => handleChangeFlavor(e, 'flavor_soda')}/>
          </div>

          <div className='sweet'>
            <label htmlFor='flavor_sweet'>단맛</label>
            <input value={formData.flavor_sweet} type='text' id='flavor_sweet' name='flavor_sweet' placeholder='1 - 5 사이로 입력해주세요' onChange={(e) => handleChangeFlavor(e, 'flavor_sweet')}/>
          </div>

          <div className='body'>
            <label htmlFor='flavor_sweet'>바디</label>
            <input value={formData.flavor_body} type='text' id='flavor_body' name='flavor_body' placeholder='1 - 5 사이로 입력해주세요' onChange={(e) => handleChangeFlavor(e, 'flavor_body')}/>
          </div>


          <div className='hashtag'>
            <label htmlFor='hashtag'>해시태그</label>
            <input value={formData.hashtag} type='text' id='hashtag' name='hashtag' placeholder='#을 제외하고 넣어주세요' onChange={handleChangeTag}/>
          </div>

          <div className='stock'>
            <label htmlFor='stock'>재고</label>
            <input value={formData.stock} type='text' id='stock' name='stock' placeholder='숫자로 입력해주세요' onChange={handleChangeStock}/>
          </div>

          <div className='register_btn'>
            <button>등록하기</button>
          </div>

        </form>
      </div>

    </div>
  )
};