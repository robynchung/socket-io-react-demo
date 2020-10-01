import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { inputType, socketIo } from "./constants";

const socket = io("http://localhost:4000/");
const currentUser = `User${Math.floor(Math.random() * 1000000)}`;

function App() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  // todo create custom hook
  useEffect(() => {
    socket.emit(socketIo.newUser, currentUser);

    return () => {
      socket.emit(socketIo.disconnect);
      socket.off();
    };
  }, []);

  // todo create custom hook
  useEffect(() => {
    socket.on(socketIo.chatMessage, message => {
      setMessageList(currentMessageList => [...currentMessageList, message]);
    });

    return () => {
      socket.emit(socketIo.disconnect);
      socket.off();
    };
  }, [message]);

  const onSubmit = event => {
    event.preventDefault();
    socket.emit(socketIo.chatMessage, message);
    setMessage("");
  };

  const renderMessage = () => {
    return messageList.map((msg, index) => (
      <li key={index}>
        user: {msg.user} / message: {msg.message}
      </li>
    ));
  };

  return (
    <div>
      <ul>{messageList.length > 0 && renderMessage()}</ul>
      <form onSubmit={onSubmit}>
        <input type={inputType.text} onChange={event => setMessage(event.target.value)} value={message} />
        <button type={inputType.submit}>Submit</button>
      </form>
    </div>
  );
}

export default App;
