import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Service/User/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  password: string = '';

  constructor(private userService: UserService,
    private router: Router
  ) { }

  signup() {
    const user: User = {
      idUser: '',
      username: this.username,
      password: this.password,
      imagecolor: ''
    }
    this.userService.createUser(user).subscribe({
      next: () => {
        this.router.navigateByUrl("/Signin");
      }
    })
  }
  navigateToSignin() {
    this.router.navigateByUrl("/Signin")
  }
}
