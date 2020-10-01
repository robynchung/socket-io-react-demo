import React, { useEffect, useState } from "react";
import io from "socket.io-client";
// import useMessage from "./hook/useMessage";
import { inputType, socketIo } from "./constants";

const socket = io("http://localhost:4000/");
const currentUser = `User${Math.floor(Math.random() * 1000000)}`;

function App() {
  const [message, setMessage] = useState();
  const [messageList, setMessageList] = useState([]);

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
    socket.on(socketIo.chatMessage, msg => {
      console.log("frontend: ", msg);
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type={inputType.text} onChange={event => setMessage(event.target.value)} />
        <button type={inputType.submit}>Submit</button>
      </form>
    </div>
  );
}

export default App;
