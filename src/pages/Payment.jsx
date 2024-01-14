import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { TbTruckDelivery } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import Agree from "../components/payment/Agree";
import getImgUrl from "../util/getImgUrl";
import useCart from "../hooks/useCart";

export default function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    //cart 페이지 또는 상세페이지에서 payment 페이지로 넘어오는 값 (회원id, 체크한 상품 id, 총상품금액, 총할인금액, 최종결제금액)
    //만약 배송지를 변경한다면 receipt 페이지로 전달하고 다시 payment 페이지로 가져옴
    const userId = state.userId;
    const checked = state.checked;  
    const totalPrice = state.totalPrice;
    const totalDcPrice = state.totalDcPrice;
    const deliveryPrice = state.deliveryPrice;
    //배송지를 선택하면 receipt 페이지에서 payment 페이지로 넘어오는 값 (수령인 이름, 전화번호, 주소, 배송지id)
    const recName = state.name; 
    const recPhone = state.phone;
    const recAddress = state.address;
    const recId = state.recId;
    //결제 페이지에서 출력되는 상품정보, 배송지정보
    const [orderAlcohol, setOrderAlcohol] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [isAgreeModal, setIsAgreeModal] = useState(false);
    const [isAgreeCheck, setIsAgreeCheck] = useState(false);

    /**
     * 결제할 상품 조회
     */
    const getOrderAlcoholInfo = () => {
        axios({
            method : 'get',
            url : `http://127.0.0.1:8000/payment`,
            params : {
                userId : userId,
                checked : checked
            }
        })
        .then((result) => {
            setOrderAlcohol(result.data);
        })
        .catch((err) => {
            console.error('axios 결제할 상품 조회 중 에러 발생 => ' + err);
        });
    }
    useEffect(() => {
        getOrderAlcoholInfo();
    }, [])

    /**
     * 기본 배송지 조회
     */
    const getOrderRecInfo = () => {
        axios({
            method : 'get',
            url : `http://127.0.0.1:8000/receipt/default/${userId}`
        })
        .then((result) => {
            if(result.data === 'none'){
                document.querySelector('.address_title button').style.display = 'none';
                document.querySelector('.default_none').style.display = 'block';
                if(recName===undefined){
                    setName(result.data[0].rec_name);
                    setPhone(result.data[0].rec_phone);
                    setAddress(result.data[0].rec_address);
                }else{
                    document.querySelector('.address_title button').style.display = 'block';
                    document.querySelector('.default_none').style.display = 'none';
                    setName(recName);
                    setPhone(recPhone);
                    setAddress(recAddress);
                }
            }else{
                if(recName===undefined){
                    setName(result.data[0].rec_name);
                    setPhone(result.data[0].rec_phone);
                    setAddress(result.data[0].rec_address);
                }else{
                    setName(recName);
                    setPhone(recPhone);
                    setAddress(recAddress);
                }
            }
        })
        .catch((err) => {
            console.error('axios 기본배송지 조회 중 에러 발생 => ' + err);
        });
    }
    useEffect(() => {
        getOrderRecInfo();
    }, [])

    /**
     * 약관동의 모달
     */
    const handleAgreeModal = () => {
        if(isAgreeModal === false){
            setIsAgreeModal(true);
            document.querySelector('.more_btn svg').style.transition = 'all 0.3s ease 0s';
            document.querySelector('.more_btn svg').style.transform = 'rotate(180deg)';
        }else{
            setIsAgreeModal(false);
            document.querySelector('.more_btn svg').style.transform = 'rotate(0deg)';
        }
    }

    /**
     * 약관동의 체크
     */
    const handleCheckAgree = () => {
        if(isAgreeCheck === false){
            setIsAgreeCheck(true);
        }else{
            setIsAgreeCheck(false);
        }
    }

    /**
     * 변경 버튼 클릭 -> 배송지목록 페이지로 이동
     */
    const handleRecList = () => {
        navigate(`receipt`, { state: { userId : userId, cartData : state }});
    }

    /**
     * 결제 버튼 클릭
     */
    const handlePay = () => {
        if (window.confirm("결제하시겠습니까?")) {
            axios({
                method : 'post',
                url : `http://127.0.0.1:8000/payment`,
                data : {
                    userId : userId,
                    recName : name,
                    recPhone : phone,
                    recAddress : address,
                    totalOrderPrice : totalPrice+totalDcPrice+deliveryPrice,
                    orderAlcohol : orderAlcohol
                }
            })
            .then((result) => {
                alert('결제가 완료되었습니다', result.data);
                navigate(`/mypage?showContent=MyOrder`);
            })
            .catch((err) => {
                console.error('axios 결제 진행 중 에러 발생 => ' + err);
            });
        }
    }

    return(
        <main className='main_payment'>
            <div className='pay_container'>    
                <p className='pay_title'>주문 / 결제</p>
                <div className='pay_content'>
                    {/* 배송지 */}
                    <div className='address'>
                        <div className='address_title'>
                            <span>배송지</span>
                            <button type='button' onClick={handleRecList}>변경</button>
                        </div>
                        <div className='address_content'>
                            <p className='rec_name'>{name}</p>
                            <p className='rec_phone'>{phone}</p>
                            <p className='rec_address'>{address}</p>
                        </div>
                        <div className='default_none'>
                            <p>기본 배송지가 없습니다.</p>
                            <button type='button' onClick={handleRecList}>배송지 선택</button>
                        </div>
                    </div>
                    {/* 주문예정상품 */}
                    <div className='order_alcohol'>
                        <div className='order_alcohol_title'>
                            <span>주문 예정 상품</span>
                        </div>
                        <div className='order_alcohol_content'>
                            {orderAlcohol.map((alcohol, index) => 
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
                                            <span className="alcohol_qty"> 수량 {alcohol.qty}개</span>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='order_alcohol_price'>
                            <p className='delivery_price'>
                                <TbTruckDelivery />
                                <span>{deliveryPrice}원</span>
                            </p>
                            <p className='total_price'>
                                <span>주문총액</span>
                                <span>{(totalPrice+totalDcPrice+deliveryPrice).toLocaleString()}원</span>
                            </p>
                        </div>
                    </div>
                    {/* 계산서 */}
                    <div className='bill'>
                        <div className='bill_title'>
                            <span>계산서</span>
                        </div>
                        <div className='bill_content'>
                            <p className='total_price'>
                                <span>총 주문 금액</span>
                                <span>{(totalPrice+deliveryPrice).toLocaleString()}원</span>
                            </p>
                            <p className='alcohol_price'>
                                <span>상품 금액</span>
                                <span>{totalPrice.toLocaleString()}원</span>
                            </p>
                            <p className='delivery_price'>
                                <span>배송비</span>
                                <span>{deliveryPrice.toLocaleString()}원</span>
                            </p>
                            <p className='dc_price'>
                                <span>총 할인 금액</span>
                                <span>{totalDcPrice.toLocaleString()}원</span>
                            </p>
                            <p className='total_order_price'>
                                <span>총 결제 금액</span>
                                <span className='pay_price'>{(totalPrice+totalDcPrice+deliveryPrice).toLocaleString()}원</span>
                            </p>
                        </div>
                    </div>
                    {/* 약관동의 */}
                    <div className='agree'>
                        <button className='agree_check' onClick={handleCheckAgree}>
                            <div className='agree_check_img'>
                                {isAgreeCheck === true
                                ? <img src='assets/images/etc/check_on.png' alt='agree_none_check' />
                                : <img src='assets/images/etc/check_off.png' alt='agree_check' />}
                            </div>
                            <p className='agree_message'>전통주 구매자의 정보수집ㆍ이용 <span>(필수)</span></p>
                        </button>
                        <button type='button' onClick={handleAgreeModal} className='more_btn'>
                            <IoIosArrowDown />
                        </button>
                    </div>
                    {isAgreeModal===true?<Agree />:''}
                    {/* 결제 버튼 */}
                    <div className='pay'>
                        <button type='button' onClick={handlePay} className={isAgreeCheck===false || name===undefined?'impossible':''}>
                            <span>{(totalPrice+totalDcPrice+deliveryPrice).toLocaleString()}</span>
                            원 결제하기
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}