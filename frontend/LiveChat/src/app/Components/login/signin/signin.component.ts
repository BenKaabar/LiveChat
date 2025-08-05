import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/Service/Auth/auth.service';
import { UserService } from 'src/app/Service/User/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  host: User | null = null;
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService,
    private userService: UserService,
    private router: Router) { }
    
  ngOnInit(): void {
    localStorage.clear();
  }

  signin() {
    this.authService.signin(this.username, this.password).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/Home');
        this.userService.sethost(response.user)
      },
      error: () => {
        alert('Login failed: enter your right credentials');
      }
    });
  }
  navigateToSignup() {
    this.router.navigateByUrl("/Signup")
  }
}
