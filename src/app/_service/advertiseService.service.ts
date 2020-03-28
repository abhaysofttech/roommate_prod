import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class advertiseService {
  // SERVER_URL = 'https://aklogical.com/api';

  constructor(
    private http: HttpClient
  ) { }
  getRoomMateAds() {
    return this.http.get(`${SERVER_URL}/postads`);
  }
  getAllAds(reqGender) {
    return this.http.get(`${SERVER_URL}/postads/reqGender/${reqGender}`);
  }
  getCities(){
    return this.http.get(`${SERVER_URL}/postads/cities`);

  }
  getAreas(param){
    return this.http.get(`${SERVER_URL}/postads/areas/${param}`);

  }
  searchAds(options){
    return this.http.post(`${SERVER_URL}/postads`, options);

  }
  getMyAds(adId) {
        return this.http.get(`${SERVER_URL}/postads/myads/${adId}`);
  }
  getNotification(userId,requestStatus?) {
    return this.http.get(`${SERVER_URL}/users/request/${userId}/${requestStatus}`);
}
  getAdsDetails(adId) {
    return this.http.get(`${SERVER_URL}/postads/${adId}`);
}
  postAds(ads:string) {
    return this.http.post(`${SERVER_URL}/postads/newads`, ads);
  }
  
  updateRent(id: string, rents: any) {
        return this.http.put(`${SERVER_URL}/postads/updaterents/${id}`, rents);

  }
  updateAmenities(id: string, amenities: any, adsStatus: any) {
        return this.http.put(`${SERVER_URL}/postads/updateamenities/${id}`, {adsStatus: adsStatus,amenities:amenities});

  }
  updateAds(id: string, status: string) {
        return this.http.put(`${SERVER_URL}/postads/updateads/${id}`, {adsStatus: status});

  }

  adsVisits(adsDetails:any, phonenumber:Number) {
    // return this.http.post(`${SERVER_URL}/adsvisits/${phonenumber}`, {adsID:adsDetails});
    return this.http.post(`${SERVER_URL}/postads/${phonenumber}/adsvisits`, {adsID:adsDetails});

  }

  getRecentAdsVisit(phonenumber:Number) {
    return this.http.get(`${SERVER_URL}/postads/${phonenumber}/adsvisits`);

  }

  uploadImage(ImageData:any) {
    // return this.http.post(`${SERVER_URL}/adsvisits/${phonenumber}`, {adsID:adsDetails});
    return this.http.post(`${SERVER_URL}/postads/${ImageData.adsId}/images`, {ImageData});

  }
  getImage(adsId:any) {
    // return this.http.post(`${SERVER_URL}/adsvisits/${phonenumber}`, {adsID:adsDetails});
    return this.http.get(`${SERVER_URL}/postads/${adsId}`);

  }

  
}
