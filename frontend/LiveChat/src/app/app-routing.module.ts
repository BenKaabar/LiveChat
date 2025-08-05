import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveChatComponent } from './Components/LiveChat/live-chat/live-chat.component';
import { SigninComponent } from './Components/login/signin/signin.component';
import { SignupComponent } from './Components/login/signup/signup.component';
import { AuthGuard } from './Guard/auth.guard';
const routes: Routes = [
  { path: "Home", component: LiveChatComponent, canActivate: [AuthGuard] },
  { path: "Signin", component: SigninComponent },
  { path: "Signup", component: SignupComponent },
  { path: '', redirectTo: '/Signin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
