import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterData } from '../redux/modules/filterSlice';
import FilterWrap from '../components/findalcohol/FilterWrap';
import ShowAlcohol from '../components/findalcohol/ShowAlcohol';
import PagiNation from 'react-js-pagination';

export default function FilterContainer() {
  const dispatch = useDispatch();
  const { searchInput, searchInputPrice, filterInfo, checkedOption, sort } = useSelector(state => state.filterSlice);
  // const [loading, setLoading ] = useState(false); // 체크박스 광클 클릭 로딩
  const [ pad, setPad ] = useState(false); // false : pc / true : 880px이하 구간
  const [ isFilterClick, setIsFilterClick ] = useState(false); // 필터 버튼 클릭 여부 ( 햄버거 모달 )

  let timeoutId;
  useEffect(() => {
    clearTimeout(timeoutId);
    // setLoading(true);
    let filterList = { searchInput, searchInputPrice, filterInfo, checkedOption, sort }; // 요청 보낼 객체
    
    timeoutId = setTimeout(() => {
      dispatch(filterData(filterList));
      // setLoading(false);
    }, 300);
    
    return () => {
      clearTimeout(timeoutId)
    }
  }, [filterInfo, searchInputPrice, checkedOption, sort, searchInput])
  // }, [filterInfo, checkedOption, sort, dispatch])

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
      <PagiNation
        // activePage={currentPage}
        itemsCountPerPage={4}
        // totalItemsCount={reviewData.length > 0 ? reviewData[0].total_cnt : 0}
        pageRangeDisplayed={5}
        // onChange={handlePageChange}
        prevPageText='<'
        nextPageText='>'
      />
    </>
  );
}