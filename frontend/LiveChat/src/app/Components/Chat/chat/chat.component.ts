import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chatroom } from 'src/app/Models/Chatroom';
import { Message } from 'src/app/Models/Message';
import { User } from 'src/app/Models/User';
import { ChatService } from 'src/app/Service/Chat/chat.service';
import { UserService } from 'src/app/Service/User/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  currentuser: User | null = null;
  hostuser: User | null = null;
  currentchatroom!: Chatroom;
  newMessage: string = '';
  @ViewChild('messageContainer') messageContainer!: ElementRef;

  constructor(private userService: UserService,
    private chatService: ChatService,
    private router: Router,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.hostuser = this.userService.gethost();
    if (this.hostuser == null) {
      this.router.navigateByUrl("/Signin");
      return;
    }
    this.chatService.connect();
    this.hostuser = this.userService.gethost();
    this.userService.getUser().subscribe((user) => {
      this.currentuser = user;
      if (this.userService.gethost()) {
        this.loadChatroom();
      }
    });
  }

  loadChatroom() {
    this.chatService.getChatroomById(this.hostuser!.username, this.currentuser!.username).subscribe({
      next: (response) => {
        this.currentchatroom = response;

        this.cdRef.detectChanges();
        setTimeout(() => this.scrollToBottom(), 100);
        this.chatService.subscribeToChatroom(this.currentchatroom.idChatroom, (msg: Message) => {
          this.currentchatroom.content.push(msg);
          if (msg.receiver === this.hostuser?.username) {
            this.playNotificationSound();
          }
          this.cdRef.detectChanges();
          setTimeout(() => this.scrollToBottom(), 50);
        });
      },
      error: (err) => {
        console.error('Error fetching chatroom:', err);
      }
    });
  }
  sendMessage() {
    const message: Message = {
      idMessage: '',
      sender: this.hostuser?.username || '',
      receiver: this.currentuser?.username || '',
      message: this.newMessage
    };
    //  ****************** to save message ******************
    this.chatService.saveMessage(message).subscribe({
      next: () => {
        this.newMessage = '';
        this.scrollToBottom();
      }
    });
    //  ****************** using web socket ******************
    this.chatService.sendMessage(this.currentchatroom?.idChatroom, message);

    this.cdRef.detectChanges();
    setTimeout(() => this.scrollToBottom(), 100);
  }


  scrollToBottom(): void {
    try {
      const container = this.messageContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    } catch (err) {
      console.error('Scroll to bottom failed:', err);
    }
  }
  playNotificationSound(): void {
    const audio = new Audio();
    audio.src = 'assets/sounds/notification.mp3';
    audio.load();
    audio.play().catch(err => console.warn('Autoplay failed:', err));
  }

}