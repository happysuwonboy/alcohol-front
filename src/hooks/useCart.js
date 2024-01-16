import { useState, useEffect } from "react";
import axios from "axios";
import { fetchCartCount } from '../redux/modules/cartCountSlice';
import { useDispatch } from 'react-redux';
import BASE_URL from './../constants/baseurl';

export default function useCart(userId){
    const [cartList, setCartList] = useState([]);
    const dispatch = useDispatch()

    /**
     * 장바구니 리스트
     */
    const getCartList = () => {
        axios({
            method : "get",
            url : `${BASE_URL}/cart/${userId}`
        })
        .then((result) => {
            setCartList(result.data);
            dispatch(fetchCartCount(userId));
        })
        .catch((err) => {
            console.error('axios 장바구니 리스트 가져오는 중 에러 발생 => ' + err);
        });
    }

    useEffect(()=>{
        getCartList();
    }, []);

    /**
     * 장바구니 담기
     */
    const insertCart = (alcoholId, qty) => {
        axios({
            method : "post",
            url : `${BASE_URL}/cart/insert`,
            data : {
                userId : userId,
                alcoholId : alcoholId,
                qty : qty
            }
        })
        .then((result) => {
        })
        .catch((err) => {
            console.error('axios 장바구니에 추가하는 중 에러 발생 => ' + err);
        });
    }
    /**
     * 장바구니 담기 (이미 있는경우 수량 업데이트)
     */
    const updateCart = (alcoholId, qty) => {
        axios({
            method : "put",
            url : `${BASE_URL}/cart/update`,
            data : {
                userId : userId,
                alcoholId : alcoholId,
                qty : qty
            }
        })
        .then((result) => {
        })
        .catch((err) => {
            console.error('axios 장바구니에 추가하는 중 에러 발생 => ' + err);
        });
    }
    
    /**
     * 장바구니에서 삭제
     */
    const removeCart = (alcoholId) => {
        axios({
            method : "delete",
            url : `${BASE_URL}/cart/delete/${userId}/${alcoholId}`
        })
        .then((result) => {
            getCartList();
        })
        .catch((err) => {
            console.error('axios 장바구니에서 삭제 중 에러 발생 => ' + err);
        });
    }

    return [cartList, getCartList, insertCart, updateCart, removeCart];
}