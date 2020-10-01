import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { inputType, socketIo } from "./constants";

const socket = io("http://localhost:4000/");

function App() {
  const [message, setMessage] = useState();

  useEffect(() => {
    socket.emit(socketIo.newUser, `User${Math.floor(Math.random() * 1000000)}`);

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [message]);

  const onSubmit = event => {
    event.preventDefault();

    socket.emit(socketIo.chatMessage, message);

    socket.on(socketIo.chatMessage, function (msg) {
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