import { useLocation } from 'react-router-dom';
import HeaderPC from './../header/HeaderPC';
import HeaderMobile from '../header/HeaderMobile';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCartCount } from '../../redux/modules/cartCountSlice';
import getUserInfo from '../../util/getUserInfo';

export default function Header() {
    let user = getUserInfo();
    user = {user_id : user.id, isAdmin : user.user_role};
    const location = useLocation();
    const curPage = location.pathname;
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchCartCount(user.user_id));
    },[user.user_id])
    
    return (
        <>
           <HeaderPC user={user} curPage={curPage}/>
           <HeaderMobile user={user} curPage={curPage}/>
        </>
    );
}
