package com.chat.livechat.service.impl;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.chat.livechat.entity.User;
import com.chat.livechat.exception.NotFoundException;
import com.chat.livechat.repository.UserRepository;
import com.chat.livechat.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserServiceimpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void createUser(User user) throws NotFoundException {
        if (user == null) {
            log.warn("No data found for user");
            throw new NotFoundException("No data found for user");
        }
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setImagecolor(generateRandomHexColor());
        log.info("user created successfully");
        userRepository.save(newUser);
    }

    @Override
    public List<User> allUsers() throws NotFoundException {
        List<User> allUsers = userRepository.findAll();
        if (allUsers.size() < 1) {
            log.warn("No user found");
            throw new NotFoundException("No user found");
        }
        return allUsers;
    }

    @Override
    public User signin(String username, String password) throws NotFoundException {
        User fetchuser = userRepository.findByUsername(username);
        log.info(fetchuser.toString());
        if (fetchuser != null && passwordEncoder.matches(password, fetchuser.getPassword())) {
            return fetchuser;
        } else

        {
            throw new NotFoundException("user not found");
        }
    }

    private String generateRandomHexColor() {
        Random random = new Random();
        int r = random.nextInt(256);
        int g = random.nextInt(256);
        int b = random.nextInt(256);
        return String.format("#%02X%02X%02X", r, g, b);
    }

}
