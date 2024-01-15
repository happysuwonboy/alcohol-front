import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import TopButton from './components/common/TopButton';
import { useLocation } from 'react-router-dom';
import FloatingChat from './components/chatting/FloatingChat';
import { useEffect, useState } from 'react';
import { getUserInfo } from './util/getUserInfo';

function App() {
  const [user, setUser] = useState(localStorage.getItem('userInfo'))
  const location = useLocation();
  const invisible = ['/cart','/payment','/payment/receipt', '/join', '/login','/find/id','/find/pw','/find/pw/:id'].includes(location.pathname);

  useEffect(()=>{
    const user = getUserInfo()
    setUser(user);
  },[location])
  
  return (
    <>
    <Header/>
    <Outlet/>
    {!invisible && <Footer/>}
    <TopButton />
    {user?.id ? <FloatingChat user={user} /> : null}
    </>
  );
}

export default App;
