import { Link } from 'react-router-dom';
import QtyControl from "./QtyControl";
import { IoCloseSharp } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";


export default function CartedAlcohol({ alcohol, checked, onCheck, onUpdate, onDelete, userId }){
    const alcoholId = alcohol.alcohol_id;
    const img = alcohol.alcohol_img1;
    const name = alcohol.alcohol_name;
    const qty = alcohol.qty;
    const price = alcohol.alcohol_price;
    const stock = alcohol.stock;
    const dc = alcohol.dc_percent;

    /* 체크박스 선택 */
    const handleCheckbox = () => {
        if(qty > stock){
            alert(`해당 상품은 현재 최대 ${stock}개 까지 구매 가능합니다.`);
        }else{
            onCheck(alcoholId);
        }
    }
    
    /* 장바구니에서 삭제 */
    const handleDeleteAlcohol = () => {
        onDelete(alcoholId);
    }

    return(
        <div className='carted'>
            <button className='checkbox' onClick={handleCheckbox}>
                {checked.includes(alcoholId)
                ? <img src='assets/images/etc/check_on.png' alt='checked' />
                : <img src='assets/images/etc/check_off.png' alt='none_checked' />}
            </button>
            <div className='carted_content'>
                <div className='carted_alcohol'>
                    <Link to={`/findalcohol/${alcoholId}`} className='carted_alcohol_img'>
                        <img src={`assets/images/alcohol_img/${img}`} alt='carted_alcohol_img' />
                    </Link>
                    <div className='carted_alcohol_info'>
                        <div className='info_1'>
                            <Link to={`/findalcohol/${alcoholId}`} className='title'>{name}</Link>
                            <button type='button' onClick={handleDeleteAlcohol}><IoCloseSharp /></button>
                        </div>
                        <div className='info_2'>
                            <QtyControl qty={qty} stock={stock} userId={userId} alcoholId={alcoholId} onUpdate={onUpdate} />
                            {dc===0 ?   
                                <div className='price'>
                                    <span>{(price*qty).toLocaleString()}원</span>
                                </div>
                            :   <div className='price'>
                                    <span className='origin_price'>{(price*qty).toLocaleString()}원</span>
                                    <div className="dc">
                                        <span className='dc_percent'>{dc}%</span>
                                        <span className="dc_price">{(price*qty*(100-dc)*0.01).toLocaleString()}원</span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {stock <= 3 ? 
                    <div className='soldout_soon'>
                        <IoTimeOutline />
                        <span>품절임박 {stock}개 남았어요!</span>
                    </div>
                : <div className='stock'>남은 수량 {stock}개</div>}
            </div>
        </div>
    );
}