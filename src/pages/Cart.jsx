import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import CartedAlcohol from '../components/cart/CartedAlcohol';

export default function Cart() {

    const userId = 'user123';    //수정필요
    
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDcPrice, setTotalDcPrice] = useState(0);
    const [deliveryPrice, setDeliveryPrice] = useState(3000);
    const [checked, setChecked] = useState([]);   
    const [cartList, getCartList, removeCart] = useCart(userId);

    /**
     * 체크박스 선택
     */
    const handleCheck = (alcoholId) => {  //선택
        let array = checked;
        if(checked.includes(alcoholId)){
            const newArray = array.filter(item => item !== alcoholId);
            setChecked(newArray);
        }else{
            const newArray = [...checked, alcoholId];
            setChecked(newArray);
        }
    }

    const handleCheckAll = () => {  //전체 선택
        if(checked.length < cartList.length){
            let array = [];
            let qtyOver = [];
            cartList.forEach((value) => {
                if(value.qty > value.stock){
                    qtyOver.push(value.alcohol_name);
                }else{
                    array.push(value.alcohol_id);
                }
            })
            if(qtyOver.length > 0){
                alert(`재고 부족으로 구매할 수 없는 상품이 있습니다 【${qtyOver}】`);
            }else{
                setChecked(array);
            }
        }else{
            setChecked([]);
        }
    }

    /**
     * 수량 업데이트
     */
    const handleUpdateQty = () => {
        getCartList();
    }

    /**
     * 체크된 항목의 총 상품금액 계산
     */
    const calTotalPrice = () => {
        let totPrice = 0;
        checked.forEach((alcoholId) => {
            const checkedAlcohol = cartList.find((alcohol) => alcohol.alcohol_id === alcoholId);
            if (checkedAlcohol) {
                totPrice += checkedAlcohol.alcohol_price * checkedAlcohol.qty;
            }
        });
        setTotalPrice(totPrice);
    };

    /**
     * 총 할인금액 계산
     */
    const calDcPrice = () => {
        let totDcPrice = 0;
        checked.forEach((alcoholId) => {
            const checkedAlcohol = cartList.find((alcohol) => alcohol.alcohol_id === alcoholId);
            if(checkedAlcohol){
                totDcPrice += checkedAlcohol.dc_percent * checkedAlcohol.alcohol_price * checkedAlcohol.qty * 0.01
            }
        });
        totDcPrice===0?setTotalDcPrice(totDcPrice):setTotalDcPrice(-totDcPrice);
    }

    useEffect(() => {
        calTotalPrice();
        calDcPrice();
    }, [checked, cartList]);

    /**
     * 배송비 계산
     */
    const calDeliveryPrice = () => {
        if(checked.length===0 || totalPrice + totalDcPrice >= 50000){
            setDeliveryPrice(0);
        }else{
            setDeliveryPrice(3000);
        }
    }

    useEffect(() => {
        calDeliveryPrice();
    }, [totalPrice, totalDcPrice]);
    
    /**
     * 장바구니에서 삭제
     */
    const handleDelete = (alcoholId) => {   
        removeCart(alcoholId);
    }
    const handleCheckedDelete = (checked) => {
        checked.forEach((alcoholId) => {
            removeCart(alcoholId);
        })
        setChecked([]);
    }

    /**
     * 구매하기 버튼 클릭
     */
    const handleClickPayment = () => {
        navigate(`/payment`, { state: { checked, 
                                        userId : userId,
                                        totalPrice : totalPrice,
                                        totalDcPrice : totalDcPrice,
                                        deliveryPrice : deliveryPrice }});
    }

    return(
        <main className='main_cart'>
            <div className='cart_container'>    
                <div className='cart_list_wrapper'>
                    <div className='cart_list_select'>
                        <div className='all_select'>
                            {cartList.length === 0 || checked.length < cartList.length ? 
                            <>
                                <button className='checkbox' onClick={handleCheckAll}>
                                    <img src='assets/images/etc/check_off.png' alt='check_off' />
                                </button>
                                <span htmlFor='all_select'>모두 선택</span>
                                <span>({checked.length}/{cartList.length})</span>
                            </> : 
                            <>
                                <button className='checkbox' onClick={handleCheckAll}>
                                    <img src='assets/images/etc/check_on.png' alt='check_on' />
                                </button>
                                <span htmlFor='all_select'>선택 해제</span>
                                <span>({checked.length}/{cartList.length})</span>
                            </>}
                        </div>
                        <div className='delete_selected'>
                            <button onClick={() => handleCheckedDelete(checked)}>선택삭제</button>
                        </div>
                    </div>
                    <div className='cart_list'>
                        {cartList.length === 0 ?
                        <p className='empty_cart'>장바구니가 비어 있어요</p> :
                        <>
                            <div className='cart_list_title'>
                                <div className='title_left'>
                                    <span>장바구니</span>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 15 12" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M13.3025 10.2042C14.4338 9.03322 14.9995 7.51674 15 5.99995C14.9995 4.48332 14.4338 2.96684 13.3025 1.79585C10.9568 -0.632704 6.99298 -0.573297 4.6148 1.82333C2.47081 3.98375 1.05584 5.04451 0.246543 5.55392C-0.0821809 5.76073 -0.0821809 6.23917 0.246543 6.4463C1.05584 6.95571 2.47081 8.0163 4.6148 10.1767C6.99298 12.5732 10.9568 12.6328 13.3025 10.2042Z" fill="#00dc92"></path><path d="M10.4151 3.42067C10.411 2.71358 9.85255 2.14258 9.16508 2.14258C8.47762 2.14258 7.91918 2.71358 7.9151 3.42067L7.91048 4.22357L7.16666 3.97999C6.51159 3.76547 5.81106 4.1353 5.59862 4.8078C5.38618 5.4803 5.74158 6.20303 6.39413 6.42552L7.13509 6.67815L6.68001 7.3305C6.27923 7.90502 6.40472 8.70459 6.96089 9.12021C7.51706 9.53584 8.29515 9.41151 8.70252 8.84192L9.16508 8.19516L9.62765 8.84192C10.035 9.41151 10.8131 9.53584 11.3693 9.12021C11.9254 8.70459 12.0509 7.90502 11.6502 7.3305L11.1951 6.67815L11.936 6.42552C12.5886 6.20303 12.944 5.4803 12.7315 4.8078C12.5191 4.1353 11.8186 3.76547 11.1635 3.97999L10.4197 4.22357L10.4151 3.42067Z" fill="white"></path></svg>
                                    </span>
                                </div>
                                <div className='title_right'>
                                    <span>{checked.length===0?'':totalPrice+totalDcPrice>=50000?'무료배송!':`${(50000-(totalPrice+totalDcPrice)).toLocaleString()}원 더 구매하면 무료배송!`}</span>
                                </div>
                            </div>
                            {cartList.map((item, index) => 
                                <CartedAlcohol 
                                    key={index} 
                                    alcohol={item}
                                    checked={checked}
                                    onCheck={handleCheck} 
                                    onUpdate={handleUpdateQty} 
                                    onDelete={handleDelete}
                                    userId={userId} />
                            )}
                        </>
                        }
                    </div>
                </div>
                <div className='cart_bill_wrapper'>
                    <div className='cart_bill'>
                        <div className='bill_title'>
                            <p>계산서</p>
                        </div>
                        <div className='bill_content'>
                            <p>
                                <span>총 상품금액</span>
                                <span className='price'>{totalPrice.toLocaleString()}원</span>
                            </p>
                            <p>
                                <span>총 할인금액</span>
                                <span className='price'>{totalDcPrice.toLocaleString()}원</span>
                            </p>
                            <p>
                                <span>배송비</span>
                                <span className='price'>{deliveryPrice.toLocaleString()}원</span>
                            </p>
                        </div>
                        <div className='bill_price'>
                            <p>
                                <span>총 결제 예상 금액</span>
                                <span className='total_price'>{(totalPrice+totalDcPrice+deliveryPrice).toLocaleString()}원</span>
                            </p>
                        </div>
                    </div>
                    <div className='cart_pay'>
                        <button type='button' onClick={handleClickPayment} className={checked.length===0 || cartList.length===0 ? 'impossible' : 'buy'}>구매하기</button>
                    </div>
                </div>
                <div className='cart_pay_mobile'>
                    <p>
                        <span>총 결제 예상 금액</span>
                        <span className='total_price'>{(totalPrice+totalDcPrice+deliveryPrice).toLocaleString()}원</span>
                    </p>
                    <button type='button' onClick={handleClickPayment} className={checked.length===0 || cartList.length===0 ? 'impossible' : 'buy'}>구매하기</button>
                </div>
            </div>
        </main>
    );
}