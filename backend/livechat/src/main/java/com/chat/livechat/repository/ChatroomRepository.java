package com.chat.livechat.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.chat.livechat.entity.Chatroom;

public interface ChatroomRepository extends MongoRepository<Chatroom, String> {
    Optional<Chatroom> findByUser1AndUser2OrUser2AndUser1(String sender1, String receiver1, String sender2,
            String receiver2);
}
