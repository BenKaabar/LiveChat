package com.chat.livechat.service;

import java.util.List;

import com.chat.livechat.entity.User;
import com.chat.livechat.exception.NotFoundException;

public interface UserService {

    void createUser(User user) throws NotFoundException;

    List<User> allUsers() throws NotFoundException;

    User signin(String username, String password) throws NotFoundException;
}
