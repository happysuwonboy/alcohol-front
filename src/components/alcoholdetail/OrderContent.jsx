import { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";
import getUserInfo from '../../util/getUserInfo';
import useCart from '../../hooks/useCart';
import { useDispatch } from 'react-redux';
import { fetchCartCount } from '../../redux/modules/cartCountSlice';
import { useNavigate } from 'react-router-dom';

export default function OrderContent({alcohol, qty, setQty}) {
  const userInfo = getUserInfo();
  const userId = userInfo.id;
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {alcohol_id ,alcohol_name, alcohol_price, dc_percent, stock} = alcohol;
  const [cartList, getCartList, insertCart, updateCart, removeCart] = useCart(userId);

  const totalPrice = alcohol_price * qty;
  const totalDcPrice = dc_percent === 0 ? alcohol_price*(dc_percent/100)*qty : -alcohol_price*(dc_percent/100)*qty;
  const deliveryPrice = alcohol_price*((100-dc_percent)/100)*qty >= 50000 ? 0 : 3000;
  
  const handleClick = e => {
    return e.currentTarget.dataset.type==='plus'
    ?  qty + 1 >= 11 ? alert('수량은 최대 10개까지 설정할 수 있습니다.') : setQty(qty + 1)
    :  qty - 1 <= 0 ? alert('주문 최소 수량은 1개입니다.') : setQty(qty - 1)
  }
  useEffect(()=>setQty(1),[alcohol_id]);

  const isCart = cartList.some(item => item.alcohol_id === alcohol_id);

  /**
   * 장바구니 담기
   */
  const handleAddCart = () => {
    if(isCart){
        if (window.confirm("이미 장바구니에 있는 상품입니다. 추가하시겠습니까?")) {
            updateCart(alcohol_id, qty);
            if(window.confirm('장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?')){
                navigate(`/cart`);
            }else{
                getCartList();
            }
        }
    }else{
        insertCart(alcohol_id, qty);
        dispatch(fetchCartCount(userId));
        if(window.confirm('장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?')){
            navigate(`/cart`);
        }else{
            getCartList();
        }
    }
  }
  
  /**
   * 바로 구매하기
   */
  const handleBuyNow = () => {
    if(qty <= stock){
        if(isCart){
            removeCart(alcohol_id);
            insertCart(alcohol_id, qty);
            navigate(`/payment`, { state: { checked : [alcohol_id],
                                            userId : userId,
                                            isPayNow : true,
                                            totalPrice : totalPrice,
                                            totalDcPrice : totalDcPrice,
                                            deliveryPrice : deliveryPrice }});
        }else{
            insertCart(alcohol_id, qty);
            navigate(`/payment`, { state: { checked : [alcohol_id],
                                            userId : userId,
                                            isPayNow : true,
                                            totalPrice : totalPrice,
                                            totalDcPrice : totalDcPrice,
                                            deliveryPrice : deliveryPrice }});
        }
    }else{
        alert(`[남은 수량 : ${stock}개]\n최대 ${stock}개 까지 구매 가능합니다`)
    }
  }

  return (
    <div className="order_content_container">
      <div className="order_prodname_wrapper wrapper_common_layout">
        <h3 className="title">상품명</h3>
        <div className="content_box">
          <span className="prod_name">{alcohol_name}</span>
        </div>
      </div>
      <div className="order_qty_wrapper wrapper_common_layout">
        <h3 className="title">수량</h3>
        <div className="content_box qty_controller">
          <button
            onClick={handleClick}
            data-type="minus"
            className="minus control_btn"
          >
            <FaMinus />
          </button>
          <span className="order_qty">{qty}</span>
          <button
            onClick={handleClick}
            data-type="plus"
            className="plus control_btn"
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <div className="order_totalprice_wrapper wrapper_common_layout">
        <h3 className="title">총 주문가격</h3>
        <div className="content_box">
          <span className="order_total_price">
            {(
              (qty * alcohol_price * (100 - dc_percent)) /
              100
            )?.toLocaleString()}
            원
          </span>
        </div>
      </div>
      <div className="delivery_info_wrapper">
        <span className="delivery_title">
          <CiDeliveryTruck /> <span>배송정보</span>
        </span>
        <span className="delivery_fee_basic">일반배송 3,000원</span>
        <span className="delivery_fee_benefit">
          50,000원 이상 구매 시, 배송비 무료
        </span>
      </div>
      <div className="btns_container">
      { stock > 0 ?
        <>
        <button className='addcart_btn order_btn' onClick={handleAddCart}>
          <FaCartShopping />
          <span>장바구니 담기</span>
        </button>
        <button className='buynow_btn order_btn' onClick={handleBuyNow}>
          <FaCreditCard/>
          <span>바로 구매하기</span>
        </button>
        </> :
        <button className='soldout_btn order_btn'>
          <span>SOLD OUT</span>
        </button>
      }
      </div>
    </div>
  );
}
