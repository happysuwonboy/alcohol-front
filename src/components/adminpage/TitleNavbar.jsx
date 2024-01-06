export default function TitleNavbar({showContent, setShowContent}) {

  const handleClickMenu = (click) => {
    setShowContent(click);
  };

  return(
    <>
      <div className='title_navbar_wrap'>
        <div className='name_wrap'>
          <p>ADMIN</p>
          <span>﹒관리자입니다﹒</span>
        </div>
        <ul className='navbar_wrap'>
          <li onClick={() => handleClickMenu('member')} className={showContent === 'member' ? 'active' : ''}>
            <p>Member</p>
          </li>
          <li onClick={() => handleClickMenu('product')} className={showContent === 'product' ? 'active' : ''}>
            <p>Product</p>
          </li>
          <li onClick={() => handleClickMenu('order')} className={showContent === 'order' ? 'active' : ''}>
            <p>Order﹒Pay</p>
          </li>
          <li onClick={() => handleClickMenu('notice')} className={showContent === 'notice' ? 'active' : ''}>
            <p>Notice</p>
          </li>
          <li onClick={() => handleClickMenu('chat')} className={showContent === 'chat' ? 'active' : ''}>
            <p>Chat</p>
          </li>
        </ul>
      </div>
    </>
  );
}