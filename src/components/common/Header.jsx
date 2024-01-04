import { FaSearch } from "react-icons/fa";
import { RiShoppingBagLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HeaderPC from './../header/HeaderPC';
import HeaderMobile from '../header/HeaderMobile';

export default function Header() {
const user = { user_id: '해피수원보이', isAdmin: false }
    const location = useLocation();
    const curPage = location.pathname;

    return (
        <>
           <HeaderPC user={user} curPage={curPage}/>
           <HeaderMobile user={user} curPage={curPage}/>
        </>
    );
}
