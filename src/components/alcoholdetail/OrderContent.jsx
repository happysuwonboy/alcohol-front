import { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";


export default function OrderContent({alcohol, qty, setQty}) {
  
  const {alcohol_id ,alcohol_name, alcohol_price, dc_percent} = alcohol
  
  const handleClick = e => {
    return e.currentTarget.dataset.type==='plus'
    ?  qty + 1 >= 11 ? alert('수량은 최대 10개까지 설정할 수 있습니다.') : setQty(qty + 1)
    :  qty - 1 <= 0 ? alert('주문 최소 수량은 1개입니다.') : setQty(qty - 1)
  }
  useEffect(()=>setQty(1),[alcohol_id]);

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
        <span className="delivery_fee_basic">일반배송 3000원</span>
        <span className="delivery_fee_benefit">
          50000원 이상 구매 시, 배송비 무료
        </span>
      </div>
      <div className="btns_container">
        <button className="addcart_btn order_btn">
          <FaCartShopping />
          <span>장바구니 담기</span>
        </button>
        <button className="buynow_btn order_btn">
          <FaCreditCard/>
          <span>바로 구매하기</span>
        </button>
      </div>
    </div>
  );
}
