import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterData } from '../../redux/modules/filterSlice';
import FilterWrap from './FilterWrap';
import ShowAlcohol from './ShowAlcohol';

export default function FilterContainer() {
  const dispatch = useDispatch();
  const ReduxData = useSelector(state => state.filterSlice);
  const [ pad, setPad ] = useState(false); // false : pc / true : 880px이하 구간
  const [ isFilterClick, setIsFilterClick ] = useState(false); // 필터 버튼 클릭 여부 ( 햄버거 모달 )

  let timeoutId;
  useEffect(() => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      dispatch(filterData(ReduxData));
    }, 300);
    
    return () => {
      clearTimeout(timeoutId);
    }
  }, [ReduxData]);

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
        pad={pad}
        isFilterClick={isFilterClick}
        setIsFilterClick={setIsFilterClick}
        />
      <ShowAlcohol 
        pad={pad}
        isFilterClick={isFilterClick}
        setIsFilterClick={setIsFilterClick}
        />
    </>
  );
}