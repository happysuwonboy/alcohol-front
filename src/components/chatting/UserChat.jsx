import { MessageBox, Button, SystemMessage, Input } from 'react-chat-elements';
import io from 'socket.io-client';
import BASE_URL from '../../constants/baseurl';
import { IoMdClose } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import { getUserInfo } from '../../util/getUserInfo';

export default function UserChat({toggleShowContent, showChat, unReadCount, setUnReadCount}) {
  const [isConnected, setIsConnected] = useState(false);
  const [isAdminConnected, setIsAdminConnected] = useState(false);
  const [inputMsg, setInputMsg] = useState('')
  const [messages, setMessages] = useState([])
  const [chatRoom, setChatRoom] = useState('')
  const user = getUserInfo();
  const socket = useRef(null); 

  const handleSend = () => {
    const message = {
      text : inputMsg,
      sender : user.id,
      date : new Date(),
    }
    socket.current.emit('chatMessage', {message, chatRoomId : chatRoom});

    setInputMsg('');
  }

  
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSend();
    }
  }

  useEffect(()=>{
    if (showChat || !isConnected) {
      setUnReadCount(0)
    } else {
      setUnReadCount(unReadCount+1)
    }
  },[messages.length])


  const handleClick = () => {
    socket.current = io(BASE_URL, { transports: ['websocket', 'polling'] });

    socket.current.on('connect', () => {
      console.log('소켓 서버 연결 성공');
      const userData = {user_id : user.id || null, isAdmin : user.user_role || null}
      socket.current.emit('connectedUser', userData)
      setIsConnected(true);
    });

    socket.current.on('getChatRoomId', chatRoomId => {
      setChatRoom(chatRoomId)
      socket.current.emit('joinChatRoom', chatRoomId)
      console.log(chatRoomId);
    })
    
    socket.current.on('getPrevMessage', (prevMessages)=>{
      setMessages([...prevMessages])
    })

    socket.current.on('chatMessage', (messages) => {
      setMessages(prevMessages => [...prevMessages, messages])
    })

    socket.current.on('getConnectedSockets', sockets => {
      if (sockets.filter(socketId=>socketId!==socket.current.id).length) {
        setIsAdminConnected(true)
      } else {
        setIsAdminConnected(false)
      }
    })
  };

  return (
    <>
    <div className="chat_content_header">
            <div className={`connect_dot ${isAdminConnected ? 'connected' : ''}`}></div>
            <span className="header_title">1:1 문의</span>
            <button className="close_btn" onClick={toggleShowContent}>
              <IoMdClose />
            </button>
      </div>
      <div className="chat_content_message_list">
        {isConnected ? (
          <div className="connected">
            <SystemMessage
              text={`채팅 서버에 연결되었습니다. 자유롭게 문의를 작성해주세요!`}
            />
            {messages.map((msg,i) => 
            <MessageBox key={`chatMsg${i}`}
              position={msg?.sender===user.id ? 'right' : 'left'}
              type='text'
              title={msg?.sender===user.id ? '' : 'id'}
              avatar={msg?.sender===user.id ? '' : 's'}
              date = {msg?.date}
              // dateString={timeStr(msg?.date)}
              text = {msg?.text}
              maxWidth={50}
            />
            )}
          </div>
        ) : (
          <div className="not_connected">
            <button onClick={handleClick}>1:1 문의 연결</button>
            <span>채팅 문의를 원하시면 위 버튼을 클릭해주세요 !</span>
          </div>
        )}
      </div>
      {isConnected ? <div className="chat_content_bottom">
        <Input
          onChange={e=>setInputMsg(e.target.value)}
          value={inputMsg}
          placeholder="메시지를 입력하세요"
          rightButtons={
            <Button  color="white" 
                    backgroundColor="black" 
                    text="전송"
                    onClick={handleSend} />
          }
          onKeyPress={handleKeyPress}
        />
      </div> : null}
    </>
  );
}
