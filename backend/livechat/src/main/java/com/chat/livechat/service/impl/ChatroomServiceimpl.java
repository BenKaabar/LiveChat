package com.chat.livechat.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chat.livechat.entity.Chatroom;
import com.chat.livechat.model.Message;
import com.chat.livechat.repository.ChatroomRepository;
import com.chat.livechat.service.ChatroomService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ChatroomServiceimpl implements ChatroomService {

    @Autowired
    private ChatroomRepository chatroomRepository;

    @Override
    public void saveMessage(Message message) {
        Chatroom currentChatroom = getChatroomById(message.getSender(), message.getReceiver());

        List<Message> messages = currentChatroom.getContent();
        if (messages == null) {
            messages = new ArrayList<>();
        }
        messages.add(message);
        currentChatroom.setContent(messages);
        chatroomRepository.save(currentChatroom);
        log.info("Message sent from {} to {}: {}", message.getSender(), message.getReceiver(), message.getMessage());
    }

    @Override
    public Chatroom getChatroomById(String sender, String receiver) {
        Optional<Chatroom> optionalChatroom = chatroomRepository
                .findByUser1AndUser2OrUser2AndUser1(sender, receiver, sender, receiver);

        if (optionalChatroom.isPresent()) {
            log.info("chatroom present " + optionalChatroom.get());
            return optionalChatroom.get();
        } else {
            Chatroom newChatroom = new Chatroom();
            newChatroom.setUser1(sender);
            newChatroom.setUser2(receiver);
            newChatroom.setContent(new ArrayList<>());
            chatroomRepository.save(newChatroom);
            log.info("New chatroom created between {} and {} with id {}", sender, receiver,
                    newChatroom.getIdChatroom());
            return newChatroom;
        }
    }

}
