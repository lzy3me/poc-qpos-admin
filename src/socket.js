import { io } from "socket.io-client";

const uri = import.meta.env.WS_HOST || "ws://localhost:3000"

export const socket = io(uri);