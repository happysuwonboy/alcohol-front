import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkboxSeleted, optionRemove, optionReset, changeSort, filterData } from '../redux/filter_modules/filterSlice';
import FilterWrap from '../components/findalcohol/FilterWrap';
import ShowAlcohol from '../components/findalcohol/ShowAlcohol';

export default function FilterContainer() {
  const dispatch = useDispatch();
  const { filterInfo, checkedOption, sort } = useSelector(state => state.filtersSlice);
  const [ pad, setPad ] = useState(false); // false : pc / true : 880px이하 구간
  const [ isFilterClick, setIsFilterClick ] = useState(false); // 필터 버튼 클릭 여부 ( 햄버거 모달 )

  // console.log(checkedOption);

  // 필터 부분 880이하 구간, 이상 구간 컴포넌트 노출 여부 resize 함수
  const handleResize = () => {
    const windowWidth = window.innerWidth;
    (windowWidth <= 880) ? setPad(true) : setPad(false);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // 언마운트 될 때 이벤트 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <>
      <FilterWrap 
        dispatch={dispatch}
        filterInfo={filterInfo}
        checkedOption={checkedOption}
        sort={sort}
        changeSort={changeSort}
        checkboxSeleted={checkboxSeleted}
        optionRemove={optionRemove}
        optionReset={optionReset}
        pad={pad}
        isFilterClick={isFilterClick}
        setIsFilterClick={setIsFilterClick}
        filterData={filterData}
          />
      <ShowAlcohol 
        dispatch={dispatch}
        sort={sort}
        changeSort={changeSort}
        pad={pad}
        isFilterClick={isFilterClick}
        setIsFilterClick={setIsFilterClick}
        />
    </>
  );
}