import { getSocket } from "../socket.js";

const socket = getSocket();

socket.on("hello", (data) => {
  console.log(data.message);
});

export default socket;
