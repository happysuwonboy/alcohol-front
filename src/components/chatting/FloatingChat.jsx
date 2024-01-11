import { useEffect, useRef, useState } from 'react';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';
import 'react-chat-elements/dist/main.css';
import Draggable from 'react-draggable';
import UserChat from './UserChat';
import { getUserInfo } from './../../util/getUserInfo';
import AdminChat from './AdminChat';

export default function FloatingChat() {
  const user = getUserInfo();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showChat, setShowChat] = useState(false)
  const [isMobileDevice, setIsMobileDevice] = useState(
    window.innerWidth >= 601 ? false : true
  );
  let [unReadCount, setUnReadCount] = useState(0)
  const [isDragging, setIsDragging] = useState(false);
  const btnRef = useRef(null);
  const contentRef = useRef(null);

  const updateBtnPosition = () => {
    const buttonRect = btnRef.current.getBoundingClientRect();
    let newX = position.x;
    let newY = position.y;
    if (buttonRect.left < 0) {
      // 화면 왼쪽 뚫은 경우
      newX = -(window.innerWidth - 105);
    }

    if (buttonRect.left + 50 > window.innerWidth) {
      // 화면 오른쪽 뚫은 경우
      newX = 0;
    }

    if (buttonRect.top < 0) {
      // 화면 위쪽 뚫은 경우
      newY = -(window.innerHeight - 145);
    }

    if (buttonRect.top + 50 > window.innerHeight) {
      // 화면 아래쪽 뚫은 경우
      newY = 30;
    }

    setPosition({ x: newX, y: newY });
  };

  const handleResize = () => {
    if (window.innerWidth >= 601) {
      setIsMobileDevice(false);
    } else {
      setIsMobileDevice(true);
    }
    updateBtnPosition();
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerWidth]);

  const toggleShowContent = (e) => {
    if (isDragging) return;
    if (Array.from(contentRef.current?.classList).includes('show')) {
      contentRef.current?.classList.remove('show');
      setShowChat(false)
    } else {
      contentRef.current?.classList.add('show');
      setShowChat(true)
      setUnReadCount(0)
    }
  };

  const handleDrag = (e, data) => {
    contentRef.current.style.transition = 'all 0s';
    setPosition({ x: data.x, y: data.y });
    setIsDragging(true);
  };

  const handleDragStop = () =>
    setTimeout(() => {
      setIsDragging(false);
      contentRef.current.style.transition = 'all .5s';
      updateBtnPosition();
    }, 100);


  return (
    <>
      <div className="float_chat_container">
        <Draggable
          position={{ x: position.x, y: position.y }}
          handle= ".float_chat_btn_wrapper"
          onDrag={handleDrag}
          onStop={handleDragStop}
        >
          <div className="float_chat_btn_wrapper">
            <button
              className="float_chat_btn"
              onClick={toggleShowContent}
              onTouchEnd={toggleShowContent}
              ref={btnRef}
            >
              <IoChatbubbleEllipsesSharp />
            </button>
            {(unReadCount >= 1)
            ? <div className='user_unread_cnt'>
              {unReadCount}
            </div> : null}
          </div>
        </Draggable>
        <div
          className="chat_content_container"
          ref={contentRef}
          style={{
            bottom: !isMobileDevice ? 115 - position.y : 0,
            right: !isMobileDevice ? 75 - position.x : 0,
            maxWidth: !isMobileDevice ? '400px' : '100vw',
            maxHeight: !isMobileDevice ? '600px' : '100vh',
          }}
        >
          {(!user.user_role )
          ? <UserChat 
          toggleShowContent={toggleShowContent} 
          showChat={showChat} 
          setUnReadCount={setUnReadCount} 
          unReadCount={unReadCount}
          />
          : <AdminChat
            toggleShowContent={toggleShowContent}/>}
        </div>
      </div>
    </>
  );
}
