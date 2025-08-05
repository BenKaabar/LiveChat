import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../Models/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { Chatroom } from '../../Models/Chatroom';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private selectedUser = new BehaviorSubject<User | null>(null);
  hostUser: User | null = null;
  currentUser: User | null = null;
  private apiUrl = 'http://localhost:8080/user';
  constructor(private http: HttpClient) { }

  fetchAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/fetchAll`);
  }
  getChatroomById(): Observable<Chatroom[]> {
    return this.http.get<Chatroom[]>(`${this.apiUrl}/getChatroomById`);
  }

  createUser(user: User): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/create`, user);
  }

  setUser(user: User) {
    this.selectedUser.next(user);
  }
  getUser() {
    return this.selectedUser.asObservable();
  }
  clearUser() {
    this.selectedUser.next(null);
  }

  sethost(user: User) {
    this.hostUser = user;
  }
  gethost() {
    return this.hostUser;
  }
  clearhost() {
    this.hostUser = null;
  }
}

