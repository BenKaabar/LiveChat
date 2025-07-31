package com.chat.livechat.service;

import com.chat.livechat.entity.Chatroom;
import com.chat.livechat.model.Message;

public interface ChatroomService {
    void saveMessage(Message message);
    Chatroom getChatroomById(String sender, String recevier);
}
