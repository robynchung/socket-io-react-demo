import { useState, useEffect } from "react";
import { socketIo } from "../constants";

export default function useMessage(socket, message) {
  const [messageObject, setMessage] = useState();

  useEffect(() => {
    socket.on(socketIo.chatMessage, msg => {
      setMessage(msg);
    });

    return () => {
      socket.emit(socketIo.disconnect);
      socket.off();
    };
  }, [message]);

  return messageObject;
}
