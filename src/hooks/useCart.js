import { useState, useEffect } from "react";
import axios from "axios";

export default function useCart(userId){
    const [cartList, setCartList] = useState([]);

    /**
     * 장바구니 리스트
     */
    const getCartList = () => {
        axios({
            method : "get",
            url : `http://127.0.0.1:8000/cart/${userId}`
        })
        .then((result) => {
            setCartList(result.data);
        })
        .catch((err) => {
            console.error('axios 장바구니 리스트 가져오는 중 에러 발생 => ' + err);
        });
    }

    useEffect(()=>{
        getCartList();
    }, []);
    
    /**
     * 장바구니에서 삭제
     */
    const removeCart = (alcoholId) => {
        axios({
            method : "delete",
            url : `http://127.0.0.1:8000/cart/delete/${userId}/${alcoholId}`
        })
        .then((result) => {
            getCartList();
        })
        .catch((err) => {
            console.error('axios 장바구니에서 삭제 중 에러 발생 => ' + err);
        });
    }

    return [cartList, getCartList, removeCart];
}