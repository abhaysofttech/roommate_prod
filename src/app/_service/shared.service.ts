import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private userData = new BehaviorSubject('');
  getUserData = this.userData.asObservable()

  private networkData = new BehaviorSubject(false);
  networkDataStatus = this.networkData.asObservable()


  constructor() { }

  setUserData(data: any) {
    this.userData.next(data);
  }

  networkStatus(status: boolean) {
    this.networkData.next(status);
  }
}
