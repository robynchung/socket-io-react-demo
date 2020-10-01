import { useEffect } from "react";
import { socketIo } from "../constants";
const currentUser = `User${Math.floor(Math.random() * 1000000)}`;

export default function (socket) {
  useEffect(() => {
    socket.emit(socketIo.newUser, currentUser);

    return () => {
      socket.emit(socketIo.disconnect);
      socket.off();
    };
  }, [socket]);

  return currentUser;
}
