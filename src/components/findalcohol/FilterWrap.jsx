import { React, useState } from 'react';
import { GrPowerReset } from 'react-icons/gr';
import { GoMultiSelect } from 'react-icons/go';
import FilterSortCommon from './FilterSortCommon';
import store from '../../redux/store/store';

export default function FilterWrap(props) {
  const { filterData, filterInfo, checkedOption, sort,
    dispatch, checkboxSeleted, optionRemove, optionReset, changeSort,
    pad, isFilterClick, setIsFilterClick } = props;

  const clickCategoryIdList = checkedOption.map(list => list.categoryId); // 체크된 카테고리 색상 css
  const [ optionModal, setOptionModal ] = useState('');  // 카테고리 클릭 시 다른 체크박스 모달 닫기

  // 큰 카테고리 클릭 시 하위 카테고리 토글을 위한 핸들러
  const handleClickTypeBox = (categoryId) => {
    setOptionModal(optionModal === categoryId ? null : categoryId);
  }

  // 하위 카테고리 체크박스 클릭 시 리덕스 액션 진행 
    const handleCheckboxChange = async (categoryId, category, optionId, optionName) => {
      dispatch(checkboxSeleted({categoryId, category, optionId, optionName}));

      const currentState = store.getState();
      const { filterInfo, checkedOption, sort } = currentState.filtersSlice;
      const filterList = { filterInfo, checkedOption, sort };

      // axios 진행
      await dispatch(filterData(filterList));
    }

  // 리스트 삭제 버튼 클릭 시 리덕스 액션 진행
  const handleClickRemove = (categoryId, optionId ) => {
    dispatch(optionRemove({categoryId, optionId}));
    // axios 진행 예정 
  }

  // 초기화 클릭 시 리덕스 액션 진행
  const handleClickReset = () => {
    dispatch(optionReset());
    setOptionModal('');
    // axios 진행 예정 ( 전체리스트로 가져와야함 )
  }

  // ( 880px이하 ) filter navbar 닫기
  const handleClickCloseNav = () => {
    // setIsFilterClick(false);
    setIsFilterClick(!isFilterClick);
  }

  return(
    <>
    { pad && 
      <FilterSortCommon 
          sort={sort}
          pad ={pad} 
          changeSort={changeSort} 
          dispatch={dispatch}
          isFilterClick={isFilterClick}
          setIsFilterClick={setIsFilterClick} /> 
    }
      <div className={`filter_container ${isFilterClick ? 'toggle' : ''}`} >
        <div className={`filter_wrap ${pad ? 'pad' : ''}`}>
        { filterInfo.map(filter => (
          <div className='type_wrap' key={filter.categoryId} onClick={() => handleClickTypeBox(filter.categoryId)}>
            <div className={ `type_box ${optionModal === filter.categoryId ? 'showModal' : '' } ${clickCategoryIdList.find(id => id === filter.categoryId) ? 'click' : ''}`}>
              <span>{filter.category}</span>
              <img src='/assets/images/alcohol_detail/arrow_down.png' alt='화살표 이미지' />
            </div>
            <div className={`option_box ${optionModal === filter.categoryId ? '' : 'hidden'}`}>
            {filter.option.map(type => ( 
              <div key={type.id}>
                <input 
                  type='checkbox' 
                  id={type.id} 
                  onChange={() => handleCheckboxChange(filter.categoryId, filter.category, type.id, type.name)}
                  checked={type.checked}  />
                <label htmlFor={type.id}>{type.name}</label>
              </div>
            ))}
            </div>
          </div>
          ))}
        </div>
      {/* { checkedOption.length > 0 && */}
      { ( isFilterClick  || checkedOption.length > 0 ) &&
        <div className='checked_label_wrap'>
          <div className='label_box'>
          { checkedOption.map(item => (
            <div className='checked_label' key={item.id}>
              { item.category === '단맛' || item.category === '신맛' || item.category === '탄산'
              ? <span>{item.category} {item.name}</span>
              : <span>{item.name}</span>
              }
              <span onClick={() => handleClickRemove(item.categoryId, item.id)}>x</span> 
            </div>
          )) }
          </div>
          <div className='reset_wrap'>
        { isFilterClick &&
          <>
            <div className='pad_title'>
              <GoMultiSelect />
              <span>필터</span>
            </div>
          </>
        }
            <div className='reset_box' onClick={handleClickReset}>
              <GrPowerReset />
              <span>초기화</span>
            { isFilterClick &&
              <span className='nav_close' onClick={handleClickCloseNav}>x</span> 
            }
            </div>
          </div>
        </div>
      }
      </div>
    </>
  );
}