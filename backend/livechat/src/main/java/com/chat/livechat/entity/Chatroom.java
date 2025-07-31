package com.chat.livechat.entity;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.chat.livechat.model.Message;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Chatroom")
public class Chatroom {
    @Id
    private String idChatroom;
    private String user1;
    private String user2;
    private List<Message> content;
}
