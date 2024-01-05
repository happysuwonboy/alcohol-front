import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import TopButton from './components/common/TopButton';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const invisible = ['/cart','/payment','/payment/receipt'].includes(location.pathname);
  
  return (
    <>
    <Header/>
    <Outlet/>
    {!invisible && <Footer/>}
    <TopButton />
    </>
  );
}

export default App;
