import { useEffect, useState } from "react";
import axios from "axios";
import getImgUrl from "../../../util/getImgUrl";
import { TbTruckDelivery } from "react-icons/tb";

export default function MyOrder({userId, onContent, onOrderDetail}) {
    const [orderList, setOrderList] = useState([]);

    /**
     * 주문 내역 조회
     */
    const getOrders = () => {
        axios({
            method : "get",
            url : `http://127.0.0.1:8000/mypage/order/${userId}`
        })
        .then((result) => {
            setOrderList(result.data);
        })
        .catch((err) => {
            console.error('axios 주문 리스트 가져오는 중 에러 발생 => ' + err);
        });
    }
    useEffect(() => {
        getOrders();
    }, [])

    /**
     * 전화번호 형식 변환
     */
    function formatPhoneNumber(phoneNumber) {
        const digits = phoneNumber.replace(/\D/g, '');
        // const formattedNumber = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
        const formattedNumber = `010-${'****'}-${digits.slice(7)}`;
        return formattedNumber;
    }

    /**
     * 주문 상세보기
     */
    const handleClick = (content, orderDetail) => {
        onContent(content);
        onOrderDetail(orderDetail);
        window.scrollTo({top : 0});
    }
    
    return(
        <div className='my_order'>
            <div className='order_title'>
                <span>주문 내역</span>
                <span className='order_icon'>
                    <img src='assets/images/mypage/order.png' alt='order_icon' />
                </span>
            </div>
            <div className='order_list'>
                {orderList.map((order, index) => 
                    <div className='order' key={index}>
                        <div className='line1'>
                            <span className='date'>{order.orderInfo.order_date}</span>
                            <button type='button' onClick={() => handleClick('MyOrderDetail', order)}>주문 상세보기 &gt;</button>
                        </div>
                        <div className='line2'>
                            <span className="rec_name">{order.orderInfo.rec_name}</span>
                            <span className="rec_phone">{formatPhoneNumber(order.orderInfo.rec_phone)}</span>
                        </div>
                        <div className='order_alcohols'>
                            {(order.orderAlcohols).map((alcohol, index) => 
                                <div className='alcohol' key={index}>
                                    <div className='alcohol_img'>
                                        <img src={getImgUrl.alcohol(alcohol.alcohol_img1)} alt='alcohol_img' />
                                    </div>
                                    <div className="alcohol_info">
                                        <p className='alcohol_title'>
                                            <span>{alcohol.alcohol_name}</span>
                                            <span className='icon'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 15 12" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M13.3025 10.2042C14.4338 9.03322 14.9995 7.51674 15 5.99995C14.9995 4.48332 14.4338 2.96684 13.3025 1.79585C10.9568 -0.632704 6.99298 -0.573297 4.6148 1.82333C2.47081 3.98375 1.05584 5.04451 0.246543 5.55392C-0.0821809 5.76073 -0.0821809 6.23917 0.246543 6.4463C1.05584 6.95571 2.47081 8.0163 4.6148 10.1767C6.99298 12.5732 10.9568 12.6328 13.3025 10.2042Z" fill="#00dc92"></path><path d="M10.4151 3.42067C10.411 2.71358 9.85255 2.14258 9.16508 2.14258C8.47762 2.14258 7.91918 2.71358 7.9151 3.42067L7.91048 4.22357L7.16666 3.97999C6.51159 3.76547 5.81106 4.1353 5.59862 4.8078C5.38618 5.4803 5.74158 6.20303 6.39413 6.42552L7.13509 6.67815L6.68001 7.3305C6.27923 7.90502 6.40472 8.70459 6.96089 9.12021C7.51706 9.53584 8.29515 9.41151 8.70252 8.84192L9.16508 8.19516L9.62765 8.84192C10.035 9.41151 10.8131 9.53584 11.3693 9.12021C11.9254 8.70459 12.0509 7.90502 11.6502 7.3305L11.1951 6.67815L11.936 6.42552C12.5886 6.20303 12.944 5.4803 12.7315 4.8078C12.5191 4.1353 11.8186 3.76547 11.1635 3.97999L10.4197 4.22357L10.4151 3.42067Z" fill="white"></path></svg>
                                            </span>
                                        </p>
                                        <p className='alcohol_volume'>[{alcohol.alcohol_volume}ml] {alcohol.alcohol_name}</p>
                                        <p className='price_qty'>
                                            <span className="alcohol_price">
                                                {alcohol.dc_percent===0
                                                    ?(alcohol.alcohol_price).toLocaleString()
                                                    :(alcohol.alcohol_price*(100-alcohol.dc_percent)*0.01).toLocaleString()
                                                }원 /
                                            </span>
                                            <span className="alcohol_qty"> 수량 {alcohol.order_qty}개</span>
                                        </p>
                                    </div>
                                </div>
                            )}
                            <p className='delivery_price'>
                                <TbTruckDelivery />
                                <span>{(order.orderInfo.total_price >= 50000 ? 0 : 3000).toLocaleString()}원</span>
                            </p>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}