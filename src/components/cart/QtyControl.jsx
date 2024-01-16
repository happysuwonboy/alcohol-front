import React from "react";
import { useState } from "react";
import axios from "axios";
import BASE_URL from "../../constants/baseurl";

export default function QtyControl({ qty, stock, userId, alcoholId, onUpdate }){
    let [number, setNumber] = useState(qty);

    const quantityCheck = (checkFlag) => {
        if(checkFlag === "minus") { 
            if(number > 1){
                setNumber(--number);
                updateQty(userId, alcoholId, checkFlag);
            }else{
                alert("최소 구매 수량은 1개 입니다.");        
            }
        }else{
            if(number < stock){
                setNumber(++number);
                updateQty(userId, alcoholId, checkFlag);
            }else{
                alert(`해당 상품은 현재 최대 ${stock}개 까지 구매 가능합니다.`);
            }
        }
    }

    /* 수량 업데이트 */
    const updateQty = (userId, alcoholId, checkFlag) => {
        axios({
            method : "get",
            url : `${BASE_URL}/cart/update/${userId}/${alcoholId}/${checkFlag}`    
        })
        .then((result) => onUpdate(number))
        .catch();
    }

    return(
        <div className='qty_control'>
            <span className='minus' onClick={() => quantityCheck('minus')}>-</span>
            <span className='qty'>{number}</span>
            <span className='plus' onClick={() => quantityCheck('plus')}>+</span>
        </div>
    );
}