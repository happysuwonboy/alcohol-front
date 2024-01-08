import { useNavigate } from 'react-router-dom';
import { RiShoppingBagLine } from "react-icons/ri";
import useCart from '../../hooks/useCart';

export default function CartButton ({user_id}) {
    const [cartList] = useCart(user_id);
    const navigate = useNavigate();
    
    return (
        <button className='user_menu_btn cart_btn' onClick={()=>navigate('/cart')}>
            <RiShoppingBagLine />
            {cartList.length ? <span className='cart_cnt'>{cartList?.length}</span> : null}
        </button>
    );
}