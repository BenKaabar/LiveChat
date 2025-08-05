package com.chat.livechat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.chat.livechat.entity.Chatroom;
import com.chat.livechat.model.Message;
import com.chat.livechat.service.ChatroomService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@AllArgsConstructor
@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/chatroom")
public class ChatroomContoller {

    @Autowired
    SimpMessagingTemplate messagingTemplate;
    @Autowired
    private ChatroomService chatroomService;

    @MessageMapping("/chat/{idChatroom}")
    public void sendToUser(@DestinationVariable String idChatroom, Message message) {
        log.info("[WebSocket] Received message for chatroom {}: {}", idChatroom, message);
        messagingTemplate.convertAndSend("/topic/chatroom/" + idChatroom, message);
    }

    @PostMapping("/saveMessage")
    public ResponseEntity<?> saveMessage(@RequestBody Message message) {
        log.info("[saveMessage] Message to save: {}", message);
        try {
            chatroomService.saveMessage(message);
            return ResponseEntity.ok().body("message sent");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/getChatroomById")
    public ResponseEntity<?> getChatroomById(@RequestParam String sender, @RequestParam String receiver) {
        try {
            log.info("reaching getChatroomById " + receiver + " " + sender);
            Chatroom chatroom = chatroomService.getChatroomById(sender, receiver);
            return ResponseEntity.ok().body(chatroom);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
