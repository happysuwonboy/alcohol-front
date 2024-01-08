
import { useEffect, useRef, useState } from 'react';
import OrderContent from './OrderContent';
import { FaChevronDown } from "react-icons/fa";

export default function FixedOrderMenu({ alcohol, qty, setQty }) {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => setShowModal(!showModal)

  const handleResize = () => {
    if (window.innerWidth >= 1026) {
      setShowModal(false)
    }
  }
  
  useEffect(()=>{
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize',handleResize)
  },[])

  return (
    <>
      <div className="bottom_btns_container fixed_container">
        <button className="buynow_btn order_btn" onClick={handleModal}>
          <span>구매하기</span>
        </button>
      </div>
      <div className={`order_modal ${showModal ? 'show' : ''}`}>
        <div className='modal_content_container'>
          <div className='modal_header'>
            <button className='hide_btn' onClick={handleModal}>
              <FaChevronDown/>
            </button>
          </div>
          <OrderContent alcohol={alcohol} qty={qty} setQty={setQty}/>
        </div>
        <div className='black_bg' onClick={handleModal}></div>
      </div>
    </>
  );
}
