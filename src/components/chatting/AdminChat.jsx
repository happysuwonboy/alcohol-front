import { useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import io from 'socket.io-client';
import BASE_URL from '../../constants/baseurl';
import { ChatItem, Input, Button, MessageBox } from 'react-chat-elements';

export default function AdminChat({ toggleShowContent, user }) {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [joinedChatRoom, setJoinedChatRoom] = useState('');
  const [chatRooms, setChatRooms] = useState({});
  const [inputMsg, setInputMsg] = useState('')
  const socket = useRef(null);  

  // 입장중인 채팅방은 안읽은 메시지 카운트 올라가지 않도록
  useEffect(()=>{
    if (joinedChatRoom) {
      setChatRooms({
        ...chatRooms,
        [joinedChatRoom] : {...chatRooms[joinedChatRoom], unread : 0
      }})
    }
  },[chatRooms[joinedChatRoom]?.chatMessages?.length])

  // 채팅방 입장 시, 해당 방에서 보이는 메시지 세팅
  useEffect(()=>{
    if (joinedChatRoom) {
      setMessages(chatRooms[joinedChatRoom]?.chatMessages)
    }
  },[chatRooms[joinedChatRoom]?.chatMessages.length, joinedChatRoom])


  const handleSend = () => {
    if (!joinedChatRoom) return

    const message = {
      text : inputMsg,
      sender : user.id,
      date : new Date(),
    }
    socket.current.emit('chatMessage', {message, chatRoomId : joinedChatRoom});
    setInputMsg('');
  }

  
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSend();
    }
  }

  // 채팅방 입장 
  const handleJoinChat = (chatRoomId) => () => {
    console.log(chatRoomId);
    socket.current.emit('joinChatRoom',chatRoomId)
    setJoinedChatRoom(chatRoomId)
    setChatRooms({
      ...chatRooms,
      [chatRoomId] : {...chatRooms[chatRoomId], unread : 0
    }})
  };

  // 채팅방 퇴장
  const handleExitChat = () => {
    socket.current.emit('leaveChatRoom', joinedChatRoom)
    setJoinedChatRoom('');
  };


  // 소켓 연결
  const handleClick = () => {
    if (!isConnected) {
      socket.current = io(BASE_URL, { transports: ['websocket', 'polling'] });

      socket.current.on('connect', () => {
        console.log('소켓 서버 연결 성공');
        const userData = { user_id: user.id || null, isAdmin: user.user_role };
        const adminData = { admin_id: user.id || null };
        socket.current.emit('connectedUser', userData);
        socket.current.emit('connectedAdmin', adminData);
        setIsConnected(true);
      });

      socket.current.on('getChatRooms', (data) => {
        setChatRooms((prevChatRooms) => {
          const newChatRooms = {};
          data.forEach((obj) => {
            const { chatRoomId, chatMessages } = obj;
            let unread;
            if (!Object.keys(prevChatRooms).includes(chatRoomId)) {
              unread = chatMessages.length;
            } else {
              unread =
                joinedChatRoom === chatRoomId
                  ? 0
                  : prevChatRooms[chatRoomId].chatMessages.length ===
                    chatMessages.length
                  ? prevChatRooms[chatRoomId].unread
                  : prevChatRooms[chatRoomId].unread + 1;
            }
            newChatRooms[chatRoomId] = {
              chatMessages,
              unread,
            };
          });

          return newChatRooms;
        });
      });
    }
  };

  return (
    <>
      <div className="chat_content_header">
        {(isConnected&& joinedChatRoom) ?
        <button className='exit_button' onClick={handleExitChat}>
          뒤로
        </button> : null}
        <span className="header_title">
          {!joinedChatRoom ? `1:1 문의 관리` : joinedChatRoom?.split('-')[1]}
        </span>
        <button className="close_btn" onClick={toggleShowContent}>
          <IoMdClose />
        </button>
      </div>
      <div className="chat_content_main">
        {(isConnected && !joinedChatRoom) ? ( // 연결 되었고, 채팅방 입장하지 않았을 때
          <div className="chat_room_list">
            {Object.keys(chatRooms).map((chatRoomId) => (
              <ChatItem
                avatar={'https://facebook.github.io/react/img/logo.svg'}
                alt={'Reactjs'}
                title={chatRoomId?.split('-')[1]}
                subtitle={chatRooms[chatRoomId]?.chatMessages?.slice(-1)[0]?.text}
                date={chatRooms[chatRoomId]?.chatMessages?.slice(-1)[0]?.date}
                unread={chatRooms[chatRoomId]?.unread}
                onClick={handleJoinChat(chatRoomId)}
              />
            ))}
          </div>
        ) 
        : 
        !isConnected ? (
          // 연결 되지 않았을 때 
          <div className="not_connected">
            <button onClick={handleClick}>1:1 문의 관리 업무 시작</button>
          </div>
        ) : ( 
          // 연결 되었고, 유저 별 채팅방 입장하였을 때
        <div className='chat_message_list'>
          {messages.map((msg,i)=>
            <MessageBox key={`chatMsg${i}`}
            position={msg?.sender===user.id ? 'right' : 'left'}
            type='text'
            title={msg?.sender===user.id ? '' : msg.sender}
            // avatar={msg?.sender===user.id ? '' : '/assets/images/main-logo.pn'}
            date = {msg?.date}
            // dateString={timeStr(msg?.date)}
            text = {msg?.text}
            maxWidth={50}
          />
          )}
        </div>
        )}
      </div>
        {(isConnected && joinedChatRoom) ? <div className="chat_content_bottom">
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
