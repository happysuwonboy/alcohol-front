import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './style/main.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import FindAlcohol from './pages/FindAlcohol';
import AlcoholDetail from './pages/AlcoholDetail';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Join from './pages/Join';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import AdminPage from './pages/AdminPage';
import FindId from './pages/FindId';
import FindPw from './pages/FindPw';
import store from './redux/store/store';

const router = createBrowserRouter([{
  path : '/',
  element : <App></App>,
  children : [
    {path : '/', element : <Home/>, index : true},
    {path : '/findalcohol', element : <FindAlcohol/>},
    {path : '/findalcohol/:alcoholid', element : <AlcoholDetail/>},
    {path : '/cart', element : <Cart/>},
    {path : '/payment', element : <Payment/>},
    {path : '/join', element : <Join/>},
    {path : '/login', element : <Login/>},
    {path : '/mypage', element : <MyPage/>},
    {path : '/adminpage', element : <AdminPage/>},
    {path : '/find/id', element : <FindId/>},
    {path : '/find/pw', element : <FindPw/>}
  ]
}])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
