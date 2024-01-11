import { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../constants/baseurl';

export default function useProduct(btnToggle) {
  const initialViewImg = ({ 0: '', 1: '', 2: ''});
  const [ foodViewImages, setFoodViewImages ] = useState(initialViewImg); // 미리보기, map 사용
  const [ alcoholViewImages, setAlcoholViewImages ] = useState(initialViewImg); // 미리보기, map 사용
  let [ foodImgFiles, setFoodImgFiles ] = useState(['', '', '']); // 서버 데이터용
  let [ alcoholImgFiles, setAlcoholImgFiles ] = useState(['', '', '']); // 서버 데이터용
  const [ duplicatedImages, setDuplicatedImages ] = useState(false); // food 이미지 중복 버튼 활성화
  
  // 초기 데이터
    const initialFormData = {
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
    };

    const [ formData, setFormData ] =  useState(initialFormData);

    // 미리보기 이미지와 form 모든 값 초기화 함수
    const resetForm = () => {
      setFormData(initialFormData);
      setFoodImgFiles(['', '', '']);
      setFoodViewImages(initialViewImg);
      setAlcoholImgFiles(['', '', '']);
      setAlcoholViewImages(initialViewImg);
      setDuplicatedImages(false);
  };

  // 등록 모달 닫기 클릭
  const handleClickClose = () => {
    document.body.style.overflow = 'auto'; // 윈도우 스크롤 생성
    btnToggle('');
  };

  // 초기화
  const handleClickReset = () => {
    resetForm();
  }

  // 선택 이미지 중복 체크 ( 서버 가기 전 프론트에서의 파일명 중복 )
  const validateFoodImages = (currentFile) => {
    return foodImgFiles.some(imgFile => imgFile.name === currentFile);
  }
    
  // food 음식 이미지 미리보기
  const handleChangeFoodImges= (e, idx) => {
    console.log('change');
    setDuplicatedImages(false);
    const uploadFile = e.target.files[0]; // 업로드한 파일 가져오기

    if(uploadFile) {
      const reader = new FileReader(); // 파일 비동기적으로 읽어와 데이터 URI를 생성

      reader.onload = (e) => {
        const uploadFileName = uploadFile.name;
        if(validateFoodImages(uploadFileName)) {
          alert('선택한 이미지 파일이 중복된 이미지가 있습니다. 다시 올려주세요');
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
      e.target.value = '';
    }
  };

  // alcohol 상품 이미지 미리보기
  const handleChageAlcoholImges = (e, idx) => {
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
      e.target.value = '';
    }
  };

  // food 음식 이미지 중복 체크
  const handleClickImgCheck = (e) => {
    console.log(foodImgFiles);
    const foodImgNames = foodImgFiles.map(file => file.name);
    if(foodImgNames.length === 3) { // 이미지 3개 다 있는지 확인
      axios({
        url : `${BASE_URL}/adminpage/imgduplicate`,
        method : 'post',
        data : {foodImages: foodImgNames}
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

    if (Number(inputPrice) >= 1 && Number(inputPrice) <= 500000 && inputPrice.trim() !== '') {
      setFormData(prev => ({...prev, alcohol_price: {text: inputPrice, error: ''}}));
    } else {
      setFormData(prev => ({...prev, alcohol_price: {text: '', error: '50만원 이하의 숫자를 입력해주세요'}}));
    }
  };
  
  const handleChangePercent = (e) => {
    const inputPercent = e.target.value;
    const numberInput = Number(inputPercent)

    if(numberInput >= 0 && numberInput <= 100 && inputPercent !== '' && inputPercent !== '00' && inputPercent !== '000' ) {
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

    if (Number(inputAbv) >= 0 && inputAbv.trim() !== '' ) {
      setFormData(prev => ({ ...prev, abv: {text : inputAbv, error: '' }}));
    } else {
      setFormData(prev => ({ ...prev, abv: {text: '', error: '%를 제외한 소수점 숫자를 입력해주세요 (30.4)'} }));
    }
  };
  
  const handleBlurAbv = (e) => {
    const inputAbv = e.target.value;

    if (Number(inputAbv) >= 0 && inputAbv.trim() !== '' && inputAbv[2] === '.') {
      setFormData(prev => ({ ...prev, abv: {text : inputAbv, error: '' }}));
    } else {
      setFormData(prev => ({ ...prev, abv: {text: '', error: '%를 제외한 소수점 숫자를 입력해주세요 (30.4)'} }));
    }
  };
  
  const handleChangeVolume = (e) => {
    const inputVloume = e.target.value;

    if (Number(inputVloume) >= 0 &&  Number(inputVloume) <= 2000 && inputVloume.trim() !== '') {
      setFormData(prev => ({ ...prev, alcohol_volume: {text: inputVloume, error: '' }}));
    } else {
      setFormData(prev => ({ ...prev, alcohol_volume: {text: '', error: 'ml 단위를 제외한 2000이하 숫자로 입력해주세요' } }));
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
    console.log('여긴오나');
    console.log(e.target);
    const inputStock = e.target.value;
    const numberStock = Number(inputStock);

    if(numberStock >= 1 && inputStock !== '' ) {
      setFormData(prev => ({ ...prev, stock: { text: inputStock, error: ''} }));
    } else {
      setFormData(prev => ({ ...prev, stock : {text: '', error: '숫자를 적어주세요'} }));
    }
  };

  return[foodViewImages, alcoholViewImages, foodImgFiles, alcoholImgFiles, duplicatedImages, formData, setFormData, setFoodViewImages, setAlcoholViewImages, setFoodImgFiles, setAlcoholImgFiles, handleClickClose, handleClickReset, handleChangeFoodImges,  handleChageAlcoholImges, handleClickImgCheck, handleChangeName, handleChangePrice, handleChangePercent, handleChangeType, handleChangeAbv, handleBlurAbv, handleChangeVolume, handleChangeFood, handleChangeComment, handleChangeFlavor, handleChangeTag, handleChangeStock, resetForm ];
}

