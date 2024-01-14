import { useState } from 'react';
import axios from 'axios';
import { HiMiniCursorArrowRays } from 'react-icons/hi2';
import { FaWineBottle } from 'react-icons/fa';
import { TbTrashXFilled } from 'react-icons/tb';
import getImgUrl from '../../../util/getImgUrl';
import BASE_URL from '../../../constants/baseurl';

export default function ProductList(props) {
  const { alcoholData, setRegisterBtnToggle, setAlcoholId, searchInput, setSearchInput, setSeletedSort, setPage } = props;
  const [ checkedAll, setCheckedAll ] = useState([]); // 체크박스 리스트 전체 선택 (해당 페이지)
  const [ checkedItems, setCheckedItems ] = useState([]); // 체크박스 개별 선택

  // 상품 이름 검색
  const handleChangeInput = (e) => {
    const searchInputValue = e.target.value;

    if(searchInputValue.trim() || searchInputValue === '' ) {
      setSearchInput(searchInputValue);
    } else {
      alert('상품 이름을 입력해주세요')
    }
  };

  // 상품 정렬 선택
  const handleChangeSort = (e) => {
    setPage(1);
    setSeletedSort(e.target.value);
  };

  // 상품 등록하기 버튼 핸들러
  const handleClickRegister = () => {
    document.body.style.overflow = 'hidden'; // 모달이 나올 때 윈도우의 기본 스크롤바 생성을 막음
    setRegisterBtnToggle(true);
  };

  // 상품 리스트 tr 선택
  const handleClickRow = (e, id) => {
    // td (체크박스) 요소 선택
    const isFirstChild = e.currentTarget.children[0] === e.target;
    if( isFirstChild || e.target.tagName === 'LABEL' || e.target.tagName === 'INPUT' || e.target.type === 'checkbox') {
      return
    } else {
      document.body.style.overflow = 'hidden';
      setAlcoholId(id);
    }
  };

  // 삭제하기 버튼
  const handleClickDelete = () => {
    const checkedId = checkedAll.length === 10 ? checkedAll : checkedItems;
    
    axios({
      url: `${BASE_URL}/adminpage/delete`,
      method: 'post',
      data: { checkedId }
    })
    .then(result => {
      if(result.data === 'delete ok') {
        alert('상품이 삭제되었습니다');
        window.location.reload();
      }else {
        alert('상품 삭제가 실패하였습니다');
      }
    })
    .catch(error => console.log(error));
  };

  // 전체 체크박스 선택
  const handelChangeAll = (e) => {
    const isChecked = e.target.checked;

    if(isChecked) {
      const allItemsId = alcoholData.map(list => list.alcohol_id);
      setCheckedAll(allItemsId);
      setCheckedItems(allItemsId);
    } else {
      setCheckedAll([]);
      setCheckedItems([]);
    }
  };

  // 체크박스 개별 선택
  const handleChangeItem = (e, id) => {
    const isChecked = e.target.checked;

    if(isChecked) {
      setCheckedItems(prev => [...prev, id]);
      if (checkedItems.length + 1 === alcoholData.length) {
        const allItemsId = alcoholData.map(list => list.alcohol_id);
        setCheckedAll(allItemsId);
        setCheckedItems(allItemsId);
      }
    } else {
      setCheckedItems(checkedItems.filter(itemId => itemId !== id));
      setCheckedAll([]);
    }
  };

  return(
    <>
      <div className='list_container'>
        <div className='title_btn_wrap'>
          <div className='title_search_wrap'>
            <div className='title_box'>
              <div className='title'>
                <FaWineBottle />
                <span>| 상품 리스트</span>
              </div>
              <div className='data_wrap'>
                <div className='search_box'>
                  <input type='text' id='product_search' value={searchInput} placeholder='상품 이름을 검색하세요' onChange={handleChangeInput} />
                  <label htmlFor='product_search' className='hidden_label'>상품 검색창</label>
                </div>
                <div className='select_box' onChange={handleChangeSort}>
                  <select name='select_sort' id='select_sort'>
                    <option value='register_date'>최신 등록순</option>
                    <option value='low_stock'>재고 낮은순</option>
                    <option value='high_stock'>재고 높은순</option>
                    <option value='low_percent'>할인율 낮은순</option>
                    <option value='high_percent'>할인율 높은순</option>
                    <option value='low_price'>가격 낮은순</option>
                    <option value='hign_price'>가격 높은순</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='btn_box'>
            <div className='delete_btn'>
              <TbTrashXFilled />
              <button type='button' onClick={handleClickDelete}>삭제</button>
            </div>
            <div className='register_btn' onClick={handleClickRegister}>
              <HiMiniCursorArrowRays />
              <button type='button'>상품 등록</button>
            </div>
          </div>
        </div>
        <div className='product_table_wrap'>
          <table className='product_table'>
            <thead>
              <tr>
                <th>
                  <input type='checkbox' id='all_check' checked={checkedItems.length === alcoholData.length} onChange={handelChangeAll}/>
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
            { alcoholData.map(list => (
              <tr key={list.alcohol_id} onClick={(e) => handleClickRow(e, list.alcohol_id)}>
                <td className='checkbox_td'>
                  <input type='checkbox' id={list.alcohol_id} checked={checkedAll.length > 0 || checkedItems.includes(list.alcohol_id)} onChange={(e) => handleChangeItem(e, list.alcohol_id)}/>
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
    </>
  );
}