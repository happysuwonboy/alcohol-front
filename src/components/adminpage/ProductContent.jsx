import { useEffect, useState } from 'react';
import axios from 'axios';
import PagiNation from 'react-js-pagination';
import BASE_URL from '../../constants/baseurl';
import ProductList from './product_content/ProductList';
import ProductRegisterForm from './product_content/ProductRegisterForm';
import ProductUpdateForm from './product_content/ProductUpdateForm';

export default function ProductContent() {
  const [ alcoholData, setAlcoholData ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ registerBtnToggle, setRegisterBtnToggle ] = useState(false);
  const [ updateClick, setUpdateClcik ] = useState(false);
  // console.log(alcoholData);
  
  useEffect(() => {
    axios.get(`${BASE_URL}/adminpage/product/${page}`)
    .then(result => {
      setAlcoholData(result.data);
    })
    .catch(error => console.log(error))
  }, [page]);

  const handleChangePage = (page) => {
    setPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  };

  return (
    <>
      <div className={`product_container ${(registerBtnToggle || updateClick)? 'toggle' : '' }`}>
        <ProductList alcoholData={alcoholData} setRegisterBtnToggle={setRegisterBtnToggle} setUpdateClcik={setUpdateClcik}/>
        <PagiNation 
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={alcoholData.length > 0 ? alcoholData[0]?.total_cnt : 0}
          pageRangeDisplayed={5}
          onChange={handleChangePage}
          prevPageText='<'
          nextPageText='>'
        />
      </div>
      <ProductRegisterForm registerBtnToggle={registerBtnToggle} setRegisterBtnToggle={setRegisterBtnToggle} />
      <ProductUpdateForm updateClick={updateClick} setUpdateClcik={setUpdateClcik}/>
      {/* { registerBtn ?  <ProductRegisterForm registerBtn={registerBtn}/>  : null} */}
    </>
  );
}