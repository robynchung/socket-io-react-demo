import { useEffect, useState } from "react";
import { socketIo } from "../constants";

export default function useMessage(socket, message) {
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on(socketIo.chatMessage, msg => {
      setMessageList(currentMessageList => [...currentMessageList, msg]);
    });

    return () => {
      socket.emit(socketIo.disconnect);
      socket.off();
    };
  }, [message, socket]);

  return messageList;
}
