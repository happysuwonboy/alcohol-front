import { useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { ImExit } from "react-icons/im";
import io from 'socket.io-client';
import BASE_URL from '../../constants/baseurl';
import { ChatItem, Input, Button, MessageBox } from 'react-chat-elements';
import timeStamp from '../../util/timeStamp';

export default function AdminChat({ toggleShowContent, user }) {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [joinedChatRoom, setJoinedChatRoom] = useState('');
  const [chatRooms, setChatRooms] = useState({});
  const [inputMsg, setInputMsg] = useState('');
  const [scrollBehavior, setScrollBehavior] = useState('auto');
  const [isAutoScroll, setIsAutoScroll] = useState(false);
  const socket = useRef(null);
  const scrollRef = useRef(null);
  const containerRef = useRef(null);

  // 입장중인 채팅방은 안읽은 메시지 카운트 올라가지 않도록
  useEffect(() => {
    if (joinedChatRoom) {
      setChatRooms({
        ...chatRooms,
        [joinedChatRoom]: { ...chatRooms[joinedChatRoom], unread: 0 },
      });
    }
  }, [chatRooms[joinedChatRoom]?.chatMessages?.length]);

  // 채팅방 입장 시, 해당 방에서 보이는 메시지 세팅
  useEffect(() => {
    if (joinedChatRoom) {
      setMessages((prevMessages) => {
        if (!prevMessages.length) {
          // 이제 막 채팅방에 들어온 경우, scrollbehavior를 auto로 하여 채팅 내역 가장 하단을 포커싱함
          setScrollBehavior('auto');
        } else {
          // 이후 채팅이 진행될때는 부드럽게 아래로 내려가도록 설정
          setScrollBehavior('smooth');
        }
        return chatRooms[joinedChatRoom]?.chatMessages;
      });
    } else {
      setMessages([]);
    }
  }, [chatRooms[joinedChatRoom]?.chatMessages.length, joinedChatRoom]);

  useEffect(() => {
    if (joinedChatRoom) {
      scrollRef.current.scrollIntoView({ behavior: scrollBehavior });
    }
  }, [messages.length, joinedChatRoom]);

  const handleSend = () => {
    if (!joinedChatRoom) return;

    const message = {
      text: inputMsg,
      sender: user.id,
      date: new Date(),
    };
    socket.current.emit('chatMessage', { message, chatRoomId: joinedChatRoom });
    setInputMsg('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // 채팅방 입장
  const handleJoinChat = (chatRoomId) => () => {
    socket.current.emit('joinChatRoom', chatRoomId);
    setJoinedChatRoom(chatRoomId);
    setChatRooms({
      ...chatRooms,
      [chatRoomId]: { ...chatRooms[chatRoomId], unread: 0 },
    });
  };

  // 채팅방 퇴장
  const handleExitChat = () => {
    socket.current.emit('leaveChatRoom', joinedChatRoom);
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

  const handleDisconnect = () => {
    socket.current.disconnect();
    setChatRooms({});
    setJoinedChatRoom('');
    setIsConnected(false);
  };

  // const handleScroll = (e) => {
  //   if (joinedChatRoom) {
  //     const scrollTop = e.target.scrollTop;
  //     const clientH = e.target.clientHeight;
  //     const scrollH = e.target.scrollHeight;
  //     setIsAutoScroll(scrollTop + clientH >= scrollH-0.5);
  //     console.log(scrollTop + clientH >= scrollH-0.5);
  //   }
  // }

  return (
    <>
      <div className="chat_content_header">
        {isConnected && joinedChatRoom ? (
          <button className="exit_button" onClick={handleExitChat}>
            <ImExit/>
          </button>
        ) : null}
        <span className="header_title">
          {!joinedChatRoom ? `1:1 문의 관리` : joinedChatRoom?.split('-')[1]}
        </span>
        <button className="close_btn" onClick={toggleShowContent}>
          <IoMdClose />
        </button>
      </div>
      <div className="chat_content_main" ref={containerRef}>
        {isConnected && !joinedChatRoom ? ( // 연결 되었고, 채팅방 입장하지 않았을 때
          <>
            <div className="chat_room_list">
              {Object.keys(chatRooms).map((chatRoomId) => (
                <ChatItem key={chatRoomId}
                  avatar={'/assets/images/chat/chat_avatar_default.jpg'}
                  alt={'Reactjs'}
                  title={chatRoomId?.split('-')[1]}
                  subtitle={
                    chatRooms[chatRoomId]?.chatMessages?.slice(-1)[0]?.text
                  }
                  date={chatRooms[chatRoomId]?.chatMessages?.slice(-1)[0]?.date}
                  unread={chatRooms[chatRoomId]?.unread}
                  onClick={handleJoinChat(chatRoomId)}
                />
              ))}
            </div>
              {!Object.keys(chatRooms).length ? (
                <div className="chatroom_nolist_text">
                  <span>실시간 문의중인 유저가 없습니다.</span>
                </div>
              ) : null}
          </>
        ) : !isConnected ? (
          // 연결 되지 않았을 때
          <div className="not_connected">
            <button onClick={handleClick}>1:1 문의 관리 업무 시작</button>
          </div>
        ) : (
          // 연결 되었고, 유저 별 채팅방 입장하였을 때
          <div className="chat_message_list">
            {messages.map((msg, i) => (
              <MessageBox
                key={`chatMsg${i}`}
                position={msg?.sender === user.id ? 'right' : 'left'}
                type="text"
                title={msg?.sender === user.id ? '' : msg.sender}
                date={msg?.date} 
                dateString={timeStamp(msg?.date)}
                text={msg?.text}
                maxWidth={50}
              />
            ))}
          </div>
        )}
        <div
          style={{ height: '1px', opacity: '0' }}
          ref={scrollRef}
          className="scroll_ref"
        ></div>
      </div>
      {isConnected && joinedChatRoom ? (
        <div className="chat_content_bottom">
          <Input
            onChange={(e) => setInputMsg(e.target.value)}
            value={inputMsg}
            placeholder="메시지를 입력하세요"
            rightButtons={
              <Button
                color="white"
                backgroundColor="black"
                text="전송"
                onClick={handleSend}
              />
            }
            onKeyPress={handleKeyPress}
          />
        </div>
      ) : null}
      {isConnected && !joinedChatRoom ? (
        <Button text="문의 업무 종료" onClick={handleDisconnect} />
      ) : null}
    </>
  );
}
