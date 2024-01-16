import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from './../constants/baseurl';

export default function useReceipt(userId){
    const [recList, setRecList] = useState([]);

    /**
     * 배송지 리스트 조회
     */
    const getRecList = () => {
        axios({
            method : "get",
            url : `${BASE_URL}/receipt/${userId}`
        })
        .then((result) => {
            setRecList(result.data);
        })
        .catch((err) => {
            console.error('axios 배송지 리스트 가져오는 중 에러 발생 => ' + err);
        });
    }

    useEffect(()=>{
        getRecList();
    }, []);

    /**
     * 배송지 추가
     */
    const insertRec = (recName, recPhone, recAddress, recDetailAddress) => {
        axios({
            method : 'post',
            url : `${BASE_URL}/receipt/insert`,
            data : {
                userId : userId,
                recName : recName,
                recPhone : recPhone,
                recAddress : recAddress,
                recDetailAddress : recDetailAddress,
                recDefault : 0
            }
        })
        .then((result) => {
            alert('배송지 추가가 완료되었습니다.');
            getRecList();
        })
        .catch((err) => {
            console.error('axios 배송지 추가하는 중 에러 발생 => ' + err);
        });
    }

    /**
     * 배송지 수정
     */
    const updateRec = (recId, recName, recPhone, recAddress, recDetailAddress, recDefault) => {
        axios({
            method : 'put',
            url : `${BASE_URL}/receipt/update`,
            data : {
                userId: userId,
                recId : recId,
                recName : recName,
                recPhone : recPhone,
                recAddress : recAddress,
                recDetailAddress : recDetailAddress,
                recDefault : recDefault
            }
        })
        .then((result) => {
            alert('배송지 수정이 완료되었습니다.');
            getRecList();
        })
        .catch((err) => {
            console.error('axios 배송지 수정하는 중 에러 발생 => ' + err);
        });
    }

    /**
     * 배송지 삭제
     */
    const deleteRec = (recId) => {
        axios({
            method : 'delete',
            url : `${BASE_URL}/receipt/delete/${recId}`
        })
        .then((result) => {
            getRecList();
        })
        .catch((err) => {
            console.error('axios 배송지 삭제하는 중 에러 발생 => ' + err);
        });
    }

    return [recList, getRecList, insertRec, updateRec, deleteRec];
}