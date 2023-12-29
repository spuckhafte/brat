import { io } from "socket.io-client";
import server from "../../server.json";

export let socket = io(server.SERVER_URL);