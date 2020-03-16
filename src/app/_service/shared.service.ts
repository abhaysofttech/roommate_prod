import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private data = new BehaviorSubject('');
  currentData = this.data.asObservable()

  private networkData = new BehaviorSubject(false);
  networkDataStatus = this.networkData.asObservable()

  constructor() { }

  updateMessage(item: any) {
    this.data.next(item);
  }

  networkStatus(status: boolean) {
    this.networkData.next(status);
  }
}
