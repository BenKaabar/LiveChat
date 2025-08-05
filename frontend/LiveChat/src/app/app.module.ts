import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './Components/Chat/chat/chat.component';
import { LiveChatComponent } from './Components/LiveChat/live-chat/live-chat.component';
import { ListUserComponent } from './Components/ListUser/list-user/list-user.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './Components/login/signin/signin.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './Components/login/signup/signup.component';
import { AuthInterceptor } from './Interceptor/auth.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    ChatComponent,
    LiveChatComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // for router-outlet
    FormsModule,
    HttpClientModule // for Http Client routing between spring and angular
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
