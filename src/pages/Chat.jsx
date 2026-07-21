import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';

export default function Chat() {
  const { user_id } = useParams();
  const [chatBox, setChatBox] = useState('');
  const [message, setMessage] = useState('');
  const [receiver, setReceiver] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const chatBoxRef = useRef(null);
  const inputRef = useRef(null);
  const sendBtnRef = useRef(null);

  const loadReceiver = useCallback(async () => {
    if (!user || !user_id) return;
    const data = await api.getUser(user_id);
    if (data.success) {
      setReceiver({
        unique_id: data.unique_id,
        fname: data.fname,
        lname: data.lname,
        img: data.img,
        status: data.status,
      });
    }
  }, [user, user_id]);

  const loadChat = useCallback(async () => {
    if (!user) return;
    const html = await api.getChat(user.unique_id, user_id);
    setChatBox(html);
  }, [user, user_id]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadReceiver();
    loadChat();
    const interval = setInterval(loadChat, 500);
    return () => clearInterval(interval);
  }, [user, user_id, loadChat, loadReceiver, navigate]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await api.insertChat(user.unique_id, user_id, message);
    setMessage('');
    if (inputRef.current) inputRef.current.focus();
    loadChat();
  };

  const handleInputChange = () => {
    if (sendBtnRef.current && inputRef.current) {
      if (inputRef.current.value !== '') {
        sendBtnRef.current.classList.add('active');
      } else {
        sendBtnRef.current.classList.remove('active');
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="wrapper">
      <section className="chat-area">
        <header>
          <Link to="/users" className="back-icon">
            <i className="fas fa-arrow-left"></i>
          </Link>
          {receiver && <img src={`/images/${receiver.img}`} alt="" />}
          <div className="details">
            <span>{receiver ? `${receiver.fname} ${receiver.lname}` : 'Chat'}</span>
            <p>{receiver?.status || ''}</p>
          </div>
          <button onClick={handleLogout} className="logout" style={{ marginLeft: 'auto' }}>Logout</button>
        </header>
        <div
          ref={chatBoxRef}
          className="chat-box"
          onMouseEnter={() => { isMouseInChatBox.current = true; chatBoxRef.current?.classList.add('active'); }}
          onMouseLeave={() => { isMouseInChatBox.current = false; chatBoxRef.current?.classList.remove('active'); }}
          dangerouslySetInnerHTML={{ __html: chatBox }}
        />
        <form onSubmit={handleSend} className="typing-area">
          <input type="hidden" name="incoming_id" value={user_id} />
          <input
            ref={inputRef}
            type="text"
            name="message"
            className="input-field"
            placeholder="Type a message here..."
            value={message}
            onChange={(e) => { setMessage(e.target.value); handleInputChange(); }}
            autoComplete="off"
          />
          <button ref={sendBtnRef} type="submit">
            <i className="fab fa-telegram-plane"></i>
          </button>
        </form>
      </section>
    </div>
  );
}
