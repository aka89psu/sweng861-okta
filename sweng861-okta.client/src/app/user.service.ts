import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:7173/userservices/user');
  }


  putUsers(article: User): void {
    this.http.put('https://localhost:7173/userservices/user', JSON.stringify(article)).subscribe();
  }


  postUsers(Users: User[]): void {
    this.http.post('https://localhost:7173/userservices/user?json=' + JSON.stringify(Users), '').subscribe();
  }


  deleteUsers(id: number): void {
    this.http.delete('https://localhost:7173/userservices/user?id=' + id).subscribe();
  }

}
