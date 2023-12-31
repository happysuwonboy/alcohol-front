import { IoMdArrowDropdown } from 'react-icons/io';
import { GoMultiSelect } from 'react-icons/go';

export default function FilterSortCommon(props) {

  const handleSortChange = (e) => {
    props.dispatch(props.changeSort(e.target.value));
    // axios 요청 추가 예정
  }
  
  const handleClickFilter = () => {
    props.setIsFilterClick(!props.isFilterClick);
  }
  
  return(
    <div className='filter_sort_wrap'>
      <p><span>10</span>건의 결과가 있어요</p>
      <div className='filter_select_wrap'>
        <div className='select_box'>
          <select value={props.sort} onChange={handleSortChange}>
            <option value='register_date'>최신순</option>
            <option value='low_price'>가격 낮은순</option>
            <option value='high_price'>가격 높은순</option>
          </select>
          <IoMdArrowDropdown /> 
        </div>
      { props.pad &&
        <div className='filter_box' onClick={handleClickFilter}>
          <GoMultiSelect />
          <span>필터</span>
        </div>
      }
      </div>
    </div>
  );
;}