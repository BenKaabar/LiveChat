package com.chat.livechat.model;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    private String idMessage;
    private String sender;
    private String receiver;
    private String message;
}
