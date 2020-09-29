import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { inputType } from "./constants";
const socket = io("http://localhost:4000");

function App() {
  const [message, setMessage] = useState();

  useEffect(() => {
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [message]);

  ddd;

  const onSubmit = event => {
    event.preventDefault();

    socket.emit("chat message", message);

    socket.on("chat message", function (msg) {
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
