import { React, useState } from 'react';
import { GrPowerReset } from 'react-icons/gr';

export default function FindWrap({filterInfo, checkedOption, dispatch, checkboxSeleted, optionRemove, optionReset}) {
  const [ clickTypeList, setClickTypeList ]  = useState(''); // 카테고리 클릭 시 체크박스 모달

  // 큰 카테고리 클릭 시 하위 카테고리 토글을 위한 핸들러
  const onClickTypeBox = (categoryId) => {
    setClickTypeList(clickTypeList === categoryId ? null : categoryId);
  }

// const onClickTypeBox = (categoryId) => {
  // setClickTypeList(prevSelectedType => (prevSelectedType === categoryId ? null : categoryId));
// };

  // 하위 카테고리 체크박스 클릭 시 리덕스 액션 진행 
  const onCheckboxChange = (categoryId, category, optionId, optionName) => {
    dispatch(checkboxSeleted({categoryId, category, optionId, optionName}));
  }

  // 리스트 삭제 버튼 클릭시 리덕스 액션 진행
  const onClickRemove = (categoryId, optionId ) => {
    dispatch(optionRemove({categoryId, optionId}));
  }

  // 초기화 클릭스 리덕스 액션 진행
  const onClickReset = () => {
    dispatch(optionReset());
  }

  return(
    <div className='findwrap_container'>
      <div className='filter_wrap'>
      { filterInfo.map(filter => (
        <div className='type_wrap' key={filter.categoryId} onClick={() => onClickTypeBox(filter.categoryId)}>
          <div className={ `type_box ${clickTypeList === filter.id ? 'click' : '' }`}>
            <span>{filter.category}</span>
            <img src='/assets/images/alcohol_detail/arrow_down.png' alt='화살표 이미지' />
          </div>
          <div className={`detail_type_box ${clickTypeList === filter.categoryId ? '' : 'hidden'}`}>
          {filter.option.map(type => ( 
            <div key={type.id}>
              <input 
                type='checkbox' 
                id={type.id} 
                onChange={() => onCheckboxChange(filter.categoryId, filter.category, type.id, type.name)}
                checked={type.checked}  />
              <label htmlFor={type.id}>{type.name}</label>
            </div>
          ))}
          </div>
        </div>
        ))}
      </div>
      <div className='checked_label_wrap'>
        <div className='label_box'>
        { checkedOption.map(item => (
          <div className='checked_label' key={item.id}>
            { item.category === '단맛' || item.category === '신맛' || item.category === '탄산'
            ? <span>{item.category} {item.name}</span>
            : <span>{item.name}</span>
            }
            <span onClick={() => onClickRemove(item.categoryId, item.id)}>x</span> 
            {/* x button : icon쓰거나 x 숫자로 직접 적게 span 쓰거나 */}
          </div>
        )) }
        </div>
        <div className='reset_box' onClick={onClickReset}>
          <GrPowerReset />
          <span>초기화</span>
        </div>
      </div>
    </div>
  );
}