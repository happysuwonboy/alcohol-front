import { useEffect, useState } from 'react';
import axios from 'axios';
import PagiNation from 'react-js-pagination';
import BASE_URL from '../../constants/baseurl';
import ProductList from './product_content/ProductList';
import ProductRegisterForm from './product_content/ProductRegisterForm';

export default function ProductContent() {
  const [ alcoholData, setAlcoholData ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ registerBtnToggle, setRegisterBtnToggle ] = useState(false);
  console.log(alcoholData);
  
  useEffect(() => {
    axios.get(`${BASE_URL}/adminpage/product/${page}`)
    .then(result => {
      setAlcoholData(result.data)
    })
    .catch(error => console.log(error))
  }, [page]);

  const handleChangePage = (page) => {
    setPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <div className={`product_container ${registerBtnToggle ? 'toggle' : '' }`}>
        <ProductList alcoholData={alcoholData} setRegisterBtnToggle={setRegisterBtnToggle}/>
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
      <ProductRegisterForm registerBtnToggle={registerBtnToggle} setRegisterBtnToggle={setRegisterBtnToggle}/>
      {/* { registerBtn ?  <ProductRegisterForm registerBtn={registerBtn}/>  : null} */}
    </>
  );
}