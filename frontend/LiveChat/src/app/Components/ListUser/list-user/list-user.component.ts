import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { ChatService } from 'src/app/Service/Chat/chat.service';
import { UserService } from 'src/app/Service/User/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  AllUsers: User[] = [];

  constructor(private userService: UserService,
    private chatService: ChatService,
    private router: Router) { }

  ngOnInit(): void {
    this.fetchAllUsers();
    this.userService.clearUser();
  }

  // **************************** select users ****************************
  selectUser(user: User) {
    this.userService.setUser(user);
  }

  // **************************** fetch all users ****************************
  fetchAllUsers() {
    this.userService.fetchAllUsers().subscribe({
      next: (response) => {
        this.AllUsers = response;
      }, error: (err) => console.log(err.error)
    })
  }

  // **************************** Logout ****************************
  logout() {
    this.userService.clearhost();
    this.userService.clearUser();
    this.chatService.disconnect();
    localStorage.clear();
    this.router.navigateByUrl("/Signin")
  }
}