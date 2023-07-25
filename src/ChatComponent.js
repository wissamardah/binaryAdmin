import React, { useEffect, useState, useRef } from 'react';
import './ChatComponent.css';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const [mobile,setMobile]=useState("")
  const fetchMessages = async () => {
    const response = await fetch('https://api.binary.yachts/api/getWhatsappMessages/'+mobile, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4NDA4MjI4MywiZXhwIjoxNjg5MjY2MjgzfQ.FgK8dkjDrQ4dTznvD3T3cayPRU-hbaTX4bKZgxEKO04' // replace with your token
      },
    });

    const data = await response.json();
    if (data.status === 'success') {
      setMessages(data.data.reverse());
    }
  };

  useEffect(()=>{

    const searchParams = new URLSearchParams(document.location.search)
   
    setMobile( searchParams.get('mobile'))
  },[])
  const sendMessage = async (event) => {
    event.preventDefault();
    if (newMessage !== '') {
      await fetch('https://api.binary.yachts/api/sendWhatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4NDA4MjI4MywiZXhwIjoxNjg5MjY2MjgzfQ.FgK8dkjDrQ4dTznvD3T3cayPRU-hbaTX4bKZgxEKO04' // replace with your token
        },
        body: JSON.stringify({
          to: mobile,
          message: newMessage
        }),
      });
      setNewMessage('');
      await fetchMessages();
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [mobile]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const sender = messages.find(message => message.sent === 0);

  return (
    <div id='chatbody'>
      <div id="title1">
        {/* Adapt this to your needs */}
        <h3 id="sendername">{sender ? sender.name : ''}</h3>
        <p id="senderDetails">{sender ? sender.phone : ''}</p>
      </div>

      <div id="chatContainer">
        {messages.map((message) => (
          <div className={`message ${message.sent ? 'sent' : 'received'}`} key={message.id}>
            <div className="bubble">
              {message.message}
              <div className="status">{message.sent ? (message.status === "sent" ? "✔️" : message.status === "delivered" ? "✔️✔️" : message.status === "read" ? "✔️✔️✔️" : "") : ''}</div>

              <div className="time">
                {new Date(message.timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form id="sendMessageForm" onSubmit={sendMessage}>
        <input type="text" id="messageInput" placeholder="أكتب رسالتك هنا ..." value={newMessage} onChange={e => setNewMessage(e.target.value)} />
        <button type="submit">ارسال</button>
      </form>
    </div>
  );
};

export default ChatComponent;