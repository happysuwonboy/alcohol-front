import { HiMiniCursorArrowRays } from 'react-icons/hi2';
import { FaWineBottle } from 'react-icons/fa';
import getImgUrl from '../../../util/getImgUrl';

export default function ProductList({alcoholDate}) {

  return(
    <div className='list_container'>
      <div className='title_btn_wrap'>
        <div className='title_box'>
          <FaWineBottle />
          <span>| 상품 리스트</span>
        </div>
        <div className='btn_box'>
          <HiMiniCursorArrowRays />
          <button type='button'>상품 등록</button>
        </div>
      </div>
      <div className='product_table_wrap'>
        <table className='product_table'>
          <thead>
            <tr>
              <th>
                <input type='checkbox' id='all_check'/>
                <label htmlFor='all_check'></label>
              </th>
              <th className='img_th'>이미지</th>
              <th className='name_th'>이름</th>
              <th className='price_th'>가격</th>
              <th className='percent_th'>할인율</th>
              <th className='stock_th'>재고</th>
              <th className='register_th'>등록일</th>
            </tr>
          </thead>
          <tbody>
          { alcoholDate.map(list => (
            <tr key={list.alcohol_id}>
              <td className='checkbox_td'>
                <input type='checkbox' id={list.alcohol_id}/>
                <label htmlFor={list.alcohol_id}></label>
              </td>
              <td className='img_td'>
                <img src={getImgUrl.alcohol(list.alcohol_img1)} alt={`${list.alcohol_name} 이미지`} />
              </td>
              <td className='name_td'>{list.alcohol_name}</td>
              <td className='price_td'>{list.alcohol_price}</td>
              <td className='percent_td'>{list.dc_percent}</td>
              <td className='stock_td'>{list.stock}</td>
              <td className='register_td'>{list.register_date}</td>
            </tr>
          )) }
          </tbody>
        </table>
      </div>

    </div>
  );
}