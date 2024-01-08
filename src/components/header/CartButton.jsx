import { useNavigate } from 'react-router-dom';
import { RiShoppingBagLine } from "react-icons/ri";
import { useSelector } from 'react-redux';

export default function CartButton () {
    const navigate = useNavigate();
    const count = useSelector((state)=>state.cartCountSlice.count);
    
    return (
        <button className='user_menu_btn cart_btn' onClick={()=>navigate('/cart')}>
            <RiShoppingBagLine />
            {count ? <span className='cart_cnt'>{count}</span> : null}
        </button>
    ) 
}