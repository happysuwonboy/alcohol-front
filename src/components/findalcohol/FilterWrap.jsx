import { React, useState } from 'react';
import { GrPowerReset } from 'react-icons/gr';
import { GoMultiSelect } from 'react-icons/go';
import { IoSearchOutline } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { checkboxSeleted, optionRemove, optionReset, changeInput, changeInputPrice } from '../../redux/modules/filterSlice';
import FilterSortCommon from './FilterSortCommon';

export default function FilterWrap(props) {
  const dispatch = useDispatch();
  const { pad, isFilterClick, setIsFilterClick } = props;
  const { searchInput, filterInfo, checkedOption } = useSelector(state => state.filterSlice);

  const clickCategoryIdList = checkedOption.map(list => list.categoryId); // 체크된 카테고리 색상 css
  const [ optionModal, setOptionModal ] = useState('');  // 카테고리 클릭 시 다른 체크박스 모달 닫기
  const [ beforeClass, setBeforeClass ] = useState(false); // navbar 스르르 위치
  const [ inputPrice, setInputPrice ] = useState([{inputPrice: 1, value: ''}, {inputPrice: 2, value: ''}, { categoryId: 6, category: '가격', id: 'priceInput' } ]);

  // 큰 카테고리 클릭 시 하위 카테고리 토글을 위한 핸들러
  const handleClickTypeBox = (categoryId) => {
    setOptionModal(optionModal === categoryId ? null : categoryId);
  }

// 하위 카테고리 체크박스 클릭 시 리덕스 액션 진행 
  const handleCheckboxChange = async (categoryId, category, optionId, optionName) => {
    document.querySelectorAll('.price').forEach(input => input.value = '');
    dispatch(changeInput(''));
    dispatch(checkboxSeleted({categoryId, category, optionId, optionName}));
  }

  // 리스트 삭제 버튼 클릭 시 리덕스 액션 진행
  const handleClickRemove = async (categoryId, optionId ) => {
    dispatch(optionRemove({categoryId, optionId}));
  }

  // 초기화 클릭 시 리덕스 액션 진행
  const handleClickReset = () => {
    document.querySelectorAll('.price').forEach(input => input.value = '');
    dispatch(optionReset());
    setOptionModal('');
  }

  // ( 880px이하 ) filter navbar 닫기
  const handleClickCloseNav = (e) => {
    e.stopPropagation();
    document.body.style.overflow = 'auto';
    setBeforeClass(!beforeClass);
    setTimeout(() => {
      setIsFilterClick(!isFilterClick);
    }, 300); // 300ms는 트랜지션 시간과 동일하게 설정
  }
  
  // ( 880px 이하 ) filter navbar 하위 컴포넌트 이벤트 핸들러
  const handleClickFilter = () => {
    document.body.style.overflow = 'hidden'; 
    setIsFilterClick(!isFilterClick);
    setTimeout(() => {
      setBeforeClass(!beforeClass);
    }, 0);
    };

  // search input 핸들러
  const handleChangeInput = (e) => {
    dispatch(optionReset());
    dispatch(changeInput(e.target.value.trim()));
  }

  // 가격 체크박스 안 input 핸들러
  const handleChangePrice1 = (e) => {
    if(Number(e.target.value) >= 0) {
      setInputPrice(prev => [
        { ...prev[0],
          value: e.target.value
        },
        prev[1],
        prev[2]
      ])
    } else {
      alert('숫자를 입력해주세요');
      document.querySelectorAll('.price').forEach(input => input.value = '');
    }
  }
  
  const handleChangePrice2 = (e) => {
    if(Number(e.target.value) >= 0) {
      setInputPrice(prev => [
        prev[0],
        { ...prev[1],
          value: e.target.value
        },
        prev[2]
      ])
    } else {
      alert('숫자를 입력해주세요');
      document.querySelectorAll('.price').forEach(input => input.value = '');
    }
  }

  // 가격 검색 input 적용 버튼 핸들러
  const handleClickPrice = () => {
    let input1 = Number(inputPrice[0].value);
    let input2 = Number(inputPrice[1].value);

    if(!input1 || !input2) {
      alert('최소 가격과 최대 가격을 모두 입력해주세요');
      document.querySelectorAll('.price').forEach(input => input.value = '');
    } else if(input1 < 0 || input2 > 100000) {
      alert('최소 가격은 0원 이상 최대 가격은 100,000원 이하로 설정해주세요')
    } else if (input1 < input2) {
      dispatch(changeInputPrice(inputPrice));
      document.querySelectorAll('.price').forEach(input => input.value = '');
      setInputPrice(prev => [
        { ...prev[0],
          value: ''
        },
        { ...prev[1],
          value: ''
        },
        prev[2]
      ])
    } else {
      alert('최대 가격이 최소 가격보다 작습니다');
      document.querySelectorAll('.price').forEach(input => input.value = '');
    }
  }

  return(
    <div className={`filter_section_container ${isFilterClick ? 'toggle' : ''}`}>
      <div className='search_wrap'>
        <label htmlFor='search' className='hidden_label'>검색</label>
        <input 
          type='text'
          placeholder='전통주 이름 검색'
          id='search'
          value={searchInput}
          onChange={handleChangeInput} />
        <IoSearchOutline />
      </div>
    { pad && 
      <FilterSortCommon 
          pad ={pad} 
          isFilterClick={isFilterClick}
          setIsFilterClick={setIsFilterClick}
          handleClickFilter={handleClickFilter} />
    }
      <div className={`filter_container ${isFilterClick ? 'toggle' : ''} ${beforeClass? 'before' : ''}`}>
        <div className={`filter_wrap ${pad ? 'pad' : ''}`}>
        { filterInfo.map(filter => (
          <div className='type_wrap' key={filter.categoryId} onClick={() => handleClickTypeBox(filter.categoryId)}>
            <div className={ `type_box ${optionModal === filter.categoryId ? 'showModal' : '' } ${clickCategoryIdList.find(id => id === filter.categoryId) ? 'click' : ''}`}>
              <span>{filter.category}</span>
              <img src='/assets/images/etc/arrow_down.png' alt='화살표 이미지' />
            </div>
            <div className={`option_box ${optionModal === filter.categoryId ? null : 'hidden'}`}>
            { filter.categoryId === 6 &&
              <div className='price_wrap' onClick={e => e.stopPropagation()}>
                <div className='input_wrap'>
                  <input 
                    type='text'
                    className='price' 
                    placeholder='0원'
                    onChange={handleChangePrice1} />
                  <span>~</span>
                  <input 
                    type='text'
                    className='price'
                    placeholder='100,000원'
                    onChange={handleChangePrice2} />
                </div>
                <button 
                  type='button'
                  onClick={handleClickPrice}>적용</button>
              </div>
            }
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
      { ( isFilterClick  || checkedOption.length > 0 ) &&
        <div className='checked_label_wrap'>
          <div className='label_box'>
          { checkedOption.map(item => (
            <div className='checked_label' key={item.id}>
              { item.category === '단맛' || item.category === '신맛' || item.category === '탄산'
              ? <span>{item.category} {item.name}</span>
              : <span>{item.name}</span>
              }
              { item.category === '가격' && item.id === 'priceInput'  && <span></span>}
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
    </div>
  );
}