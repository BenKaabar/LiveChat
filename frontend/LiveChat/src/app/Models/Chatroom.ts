import { Message } from "./Message";

export interface Chatroom {
    idChatroom: string;
    user1: string;
    user2: string;
    content: Message[];
}