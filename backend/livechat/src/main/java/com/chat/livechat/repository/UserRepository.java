package com.chat.livechat.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.chat.livechat.entity.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);
}
