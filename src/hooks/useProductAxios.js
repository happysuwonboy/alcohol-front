import axios from 'axios';
import BASE_URL from '../constants/baseurl';

export default function useProductAxios(duplicatedImages, foodImgFiles, alcoholImgFiles, formData, resetForm, url, res, text, alcoholId) {

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const passed = Object.values(formData).every(filed => filed.text !== '');
  
    if(passed && duplicatedImages) { // 모든 값이 들어 있는 경우
      const food = ['food1', 'food2', 'food3']
                    .map(food => formData[food].text)
                    .join('/');
  
      const confirm = window.confirm(`상품을 ${text}하시겠습니까?`);
      const newFormData = new FormData();
      if(confirm) {
        foodImgFiles.forEach((file, idx) => {
          newFormData.append('food_img', file);
        });
  
        alcoholImgFiles.forEach((file, idx) => {
          newFormData.append(`alcohol_img${idx}`, file);
        });
  
        text === '수정' && newFormData.append('alcohol_id', alcoholId); 
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
        url: `${BASE_URL}${url}`,
        method: 'post',
        data: newFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'form-data'
        }
      })
      .then(result => {
        if(result.data === `${res}`) {
          alert(`상품 ${text}이 완료되었습니다`);
          resetForm();
          window.location.reload();
        } else {
          alert(`상품 ${text}이 실패하였습니다`);
        }
      })
      .catch(error => console.log(error));
    } else {
      alert('이미지 중복체크와 form 양식에 맞춰 입력해 주세요');
    }
  
  }

  return handleSubmitForm;
}
