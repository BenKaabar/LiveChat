import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Service/User/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  host: User | null = null;
  username: string = '';
  password: string = '';

  constructor(private userService: UserService,
    private router: Router
  ) { }

  signin() {
    this.userService.signin(this.username, this.password).subscribe({
      next: (response) => {
        this.userService.sethost(response);
        this.router.navigateByUrl("/Home");
      },
      error: (err) => {
        alert('Login failed: ' + err.error.message);
      }
    })
  }
  navigateToSignup() {
    this.router.navigateByUrl("/Signup")
  }
}
