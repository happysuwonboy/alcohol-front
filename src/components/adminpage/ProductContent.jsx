import { useEffect, useState } from 'react';
import axios from 'axios';
import PagiNation from 'react-js-pagination';
import { RiEmotionSadLine } from 'react-icons/ri';
import BASE_URL from '../../constants/baseurl';
import ProductList from './product_content/ProductList';
import ProductRegisterForm from './product_content/ProductRegisterForm';
import ProductUpdateForm from './product_content/ProductUpdateForm';

export default function ProductContent() {
  const [ alcoholData, setAlcoholData ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ registerBtnToggle, setRegisterBtnToggle ] = useState(false);
  const [ alcoholId, setAlcoholId ] = useState(''); // 클릭한 row 상품 id
  const [ searchInput, setSearchInput ] = useState('');
  const [ seletedSort, setSeletedSort ] = useState('register_date');

  // 상품 리스트 요청 ( 페이지네이션, 검색, sort )
  useEffect(() => {
    const pageData = { page, searchInput, seletedSort }
    axios({
      url : `${BASE_URL}/adminpage/product/search`,
      method: 'post',
      data: pageData
    })
    .then(result => { setAlcoholData(result.data);})
    .catch(error => console.log(error));
  }, [page, searchInput, seletedSort]);

  // 페이지네이션 핸들러
  const handleChangePage = (page) => {
    setPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  };

  return (
    <>
      <div className={`product_container ${(registerBtnToggle || alcoholId)? 'toggle' : '' }`}>
        <ProductList alcoholData={alcoholData} setRegisterBtnToggle={setRegisterBtnToggle} setAlcoholId={setAlcoholId} searchInput={searchInput} setSearchInput={setSearchInput} setSeletedSort={setSeletedSort} setPage={setPage}/>
        { alcoholData.length > 0 ? 
          <PagiNation 
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={alcoholData.length > 0 ? alcoholData[0]?.total_cnt : 0}
          pageRangeDisplayed={5}
          onChange={handleChangePage}
          prevPageText='<'
          nextPageText='>'
          />
          : <div className='filter_empty'><RiEmotionSadLine /><p>일치하는 검색 결과가 없습니다</p></div> }
      </div>
      <ProductRegisterForm registerBtnToggle={registerBtnToggle} setRegisterBtnToggle={setRegisterBtnToggle} />
      <ProductUpdateForm setAlcoholId={setAlcoholId} alcoholId={alcoholId} />
    </>
  );
}