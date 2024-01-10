import { useEffect, useRef, useState } from 'react';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';
import { useDrag } from 'react-use-gesture';
import { useSpring, animated } from 'react-spring';
import DragContainer from './DragContainer';

export default function FloatingChat() {
  const [draggable, setDraggable] = useState(true);
  const btnRef = useRef(null)
  const contentRef = useRef(null);

  
  const showChatContent = (e) => { 
    if (e.currentTarget!==btnRef.current) return ;

    if (Array.from(contentRef.current?.classList).includes('show')) {
        contentRef.current?.classList.remove('show')
    } else {
        contentRef.current?.classList.add('show')
    }
  }

  return (
    <div className="float_chat_container">
      <DragContainer draggable={draggable}>
        <button className="float_chat_btn" onClick={showChatContent} ref={btnRef}>
          <IoChatbubbleEllipsesSharp />
        </button>
        <div className='chat_content_container' ref={contentRef}>
            가나다라마바사
        </div>
      </DragContainer>
    </div>
  );
}
