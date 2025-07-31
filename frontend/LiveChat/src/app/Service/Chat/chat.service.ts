import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chatroom } from '../../Models/Chatroom';
import { Observable } from 'rxjs';
import { Client, IMessage } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Message } from '../../Models/Message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatroom!: Chatroom;
  stompClient!: Client;

  private apiUrl = 'http://localhost:8080/chatroom';
  constructor(private http: HttpClient) { }

  getChatroomById(sender: string, recevier: string): Observable<Chatroom> {
    const params = new HttpParams()
      .set('sender', sender)
      .set('recevier', recevier);

    return this.http.get<Chatroom>(`${this.apiUrl}/getChatroomById`, { params });
  }

  saveMessage(message: Message): Observable<string> {
    return this.http.post(`${this.apiUrl}/saveMessage`, message,
      { responseType: 'text' });
  }

  connect(): void {

    this.stompClient = new Client({
      brokerURL: '',
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
    });

    this.stompClient.onConnect = (frame) => {

      this.stompClient.subscribe('/topic/messages', (message: IMessage) => {
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('[WebSocketService] STOMP Error:', frame);
    };

    this.stompClient.onWebSocketError = (event) => {
      console.error('[WebSocketService] WebSocket error:', event);
    };

    this.stompClient.activate();
  }

  subscribeToChatroom(chatroomId: string, callback: (msg: Message) => void): void {

    this.stompClient.subscribe(`/topic/chatroom/${chatroomId}`, (message: IMessage) => {

      const receivedMsg: Message = JSON.parse(message.body);
      callback(receivedMsg);
    });
  }

  sendMessage(chatroomId: string, message: Message): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: `/app/chat/${chatroomId}`,
        body: JSON.stringify(message)
      });
      this.http.post('http://localhost:8080/chatroom/saveMessage', message, { responseType: 'text' })
        .subscribe({
          error: (err) => console.error('Error saving message:', err)
        });
    } else {
      console.warn('[WebSocketService] Not connected. Message not sent.');
    }
  }

  disconnect(): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.deactivate();
    }
  }


}
