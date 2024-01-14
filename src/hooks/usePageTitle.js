import axios from 'axios';
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import BASE_URL from '../constants/baseurl';


const usePageTitle = () => {
    const [pageTitle, setPageTitle] = useState('');
    const location = useLocation();
    const curPage = location.pathname;

    useEffect(()=>{
        if (curPage ==='/mypage') {
            setPageTitle('마이페이지')
        } else if (curPage.slice(0,13)==='/findalcohol/') {
          axios.get(`${BASE_URL}/alcoholdetail/${curPage.slice(13)}`)
          .then(res=> setPageTitle(res.data.alcohol_name))
          .catch(err => console.log(err))
        } else if (curPage === '/cart') {
          setPageTitle('장바구니')
        } else if (curPage==='/payment') {
          setPageTitle('주문/결제')
        } else if (curPage === '/adminpage') {
          setPageTitle('관리자 페이지')
        } else if (curPage === '/login') {
          setPageTitle('로그인')
        } else if (curPage === '/join') {
          setPageTitle('회원가입')
        } else {
          setPageTitle('')
        }
      },[curPage])


      return pageTitle
}

export default usePageTitle;