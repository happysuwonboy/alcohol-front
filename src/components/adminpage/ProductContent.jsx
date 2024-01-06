import { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../constants/baseurl';
import ProductList from './product_content/ProductList';

export default function ProductContent() {
  const [ alcoholDate, setAlcoholData ] = useState([]);
  
  useEffect(() => {
    axios.get(`${BASE_URL}/adminpage/product`)
    .then(result => {
      setAlcoholData(result.data)
    })
    .catch(error => console.log(error))
  }, []);

  return (
    <div className='product_container'>
      <ProductList alcoholDate={alcoholDate}/>
    </div>
  );
}