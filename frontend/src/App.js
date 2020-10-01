import React, { useState } from "react";
import io from "socket.io-client";
import useMessage from "./hook/useMessage";
import useNewUser from "./hook/useNewUser";
import { inputType, socketIo } from "./constants";

const socket = io("http://localhost:4000/");

function App() {
  const [message, setMessage] = useState("");
  const messageList = useMessage(socket, message);
  const currentUser = useNewUser(socket);

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
      {currentUser}
      <ul>{messageList.length > 0 && renderMessage()}</ul>
      <form onSubmit={onSubmit}>
        <input type={inputType.text} onChange={event => setMessage(event.target.value)} value={message} />
        <button type={inputType.submit}>Submit</button>
      </form>
    </div>
  );
}

export default App;
