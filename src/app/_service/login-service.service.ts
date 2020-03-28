import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SERVER_URL } from 'src/environments/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class LoginServiceService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    // SERVER_URL = 'https://aklogical.com/api';

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('roommate')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('roommate')));
        return this.currentUserSubject.value;
    }
    syncLocalDB(userID){
        return this.http.get(`${SERVER_URL}/users/syncUser/${userID}`);
    }
    getToken(): string {
        return localStorage.getItem('roommatetoken');
    }
    login(phonenumber, password) {
        return this.http.post<any>(`${SERVER_URL}/users/authenticate`, { phonenumber, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('roommate', JSON.stringify(user[0]));
                localStorage.setItem('roommatetoken', user[1].token);
                this.currentUserSubject.next(user);
                return user;
            }));
    }
    loginemail(email, password) {
        return this.http.post<any>(`${SERVER_URL}/users/authenticatebyemail`, { email, password })
            .pipe(map(user => {
                localStorage.setItem('roommate', JSON.stringify(user[0]));
                localStorage.setItem('roommatetoken', user[1].token);
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('roommate');
        localStorage.removeItem('roommatetoken');
        this.currentUserSubject.next(null);
    }

    getAll() {
        return this.http.get(`${SERVER_URL}/users`);
    }
    register(user) {
        // debugger
        return this.http.post(`${SERVER_URL}/users/register`, user);
    }
    checkphonenumber(phonenumber) {
        return this.http.get(`${SERVER_URL}/users/phonenumber/${phonenumber}`);
    }
    checkemail(email) {
        return this.http.get(`${SERVER_URL}/users/emailcheck/${email}`);
    }
}