import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { inputType, socketIo } from "./constants";

const socket = io("http://localhost:4000/");
const currentUser = `User${Math.floor(Math.random() * 1000000)}`;

function App() {
  const [message, setMessage] = useState();
  const [typing, setTyping] = useState({ user: "", isTyping: false });

  useEffect(() => {
    socket.emit(socketIo.newUser, currentUser);

    return () => {
      socket.emit(socketIo.disconnect);
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on(socketIo.typing, data => {
      const { isTyping, user } = data;
      console.log(data);

      if (!isTyping) {
        setTyping(currentTyping => ({ ...currentTyping, user: "", isTyping: false }));
      } else {
        setTyping(currentTyping => ({ ...currentTyping, user, isTyping }));
      }
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

  const onKeyUp = () => {
    socket.emit(socketIo.typing, {
      isTyping: message.length > 0,
      user: currentUser
    });
  };

  return (
    <div>
      {typing.isTyping && <div>{typing.user} is typing</div>}
      <form onSubmit={onSubmit}>
        <input type={inputType.text} onChange={event => setMessage(event.target.value)} onKeyUp={onKeyUp} />
        <button type={inputType.submit}>Submit</button>
      </form>
    </div>
  );
}

export default App;
