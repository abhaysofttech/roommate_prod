import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { advertiseService } from 'src/app/_service';
import { MapsAPILoader } from '@agm/core';

import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
declare var google;
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {

  @ViewChild('map', { static: false }) googleMap;
  mapElement: any;
  map: any;
  apiResponse: any;
  eventResponse: any;
  mapOptions: any;
  mapCenter = { lat: null, lng: null };
  markerOptions: any = { position: null, map: null, title: null };
  marker: any;
  zoom: number;
  address: string;
  shortaddress: string;
  shortaddress1: string;
  shortaddress2: string;
  state: string;
  city: string;
  area: string;
  pincode: number;
  latitude: number;
  longitude: number;
  landmark: string;

  private geoCoder;

  adsaddress: FormGroup;
  //loading = false;
  submitted = false;
  adsId = '';

  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;
  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    // private location: LocationService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,

    // private formBuilder: FormBuilder,
    private _advertiseService: advertiseService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {
    debugger
    this.route.params.subscribe(params => this.adsId = params.id);
  }
  onSubmit() {
    this.submitted = true;
    let postValue = {
      address: this.address,
      shortaddress: this.shortaddress,
      state: this.state,
      city: this.city,
      area: this.area,
      pincode: this.pincode,
      landmark: this.landmark,
      latitude: this.latitude,
      longitude: this.longitude
    }
    this._advertiseService.updateRent(this.adsId, postValue)
      //  .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/pages/advertise/rent-details', this.adsId]);
          // console.log(data);
        },
        error => {
          //  this.alertService.error(error);
          //  this.loading = false;
        });
  }
  ionViewDidEnter() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["geocode"],
        componentRestrictions: { 'country': 'IN' }
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 18;
          this.getAddress(this.latitude, this.longitude);

        });
      });
    });
  }
  currentLocation() {
    this.setCurrentLocation();
  }
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 14;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  markerDragEnd($event: MouseEvent) {
    //console.log($event);
    this.searchElementRef.nativeElement.value = "";
    this.eventResponse = $event;
    this.latitude = this.eventResponse.coords.lat;
    this.longitude = this.eventResponse.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
  mapDragEnd($event: MouseEvent) {
    console.log($event);
  }
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 18;
          this.address = results[0].formatted_address;
          let shortaddress1 = results[0].address_components.filter(function (item) { return item.types[2] === 'sublocality_level_2' });
          let shortaddress2 = results[0].address_components.filter(function (item) { return item.types[2] === 'sublocality_level_1' });
          this.searchElementRef.nativeElement.value = results[0].formatted_address;
          let pincode = results[0].address_components.filter(function (item) { return item.types[0] === 'postal_code' })
          let state = results[0].address_components.filter(function (item) { return item.types[0] === 'administrative_area_level_1' })
          let city = results[0].address_components.filter(function (item) { return item.types[0] === 'locality' })
          this.pincode = pincode[0].short_name;
          if (state.length !== 0 && state[0].long_name !== undefined) {
            this.state = state[0].long_name;
          } else {
            this.state = '';
          }
          if (city.length !== 0 && city[0].long_name !== undefined) {
            this.city = city[0].long_name;
          } else {
            this.city = '';
          }
          if (shortaddress1.length !== 0 && shortaddress1[0].long_name !== undefined) {
            this.shortaddress1 = shortaddress1[0].long_name;
          } else {
            this.shortaddress1 = '';
          }

          if (shortaddress2.length !== 0 && shortaddress2[0].long_name !== undefined) {
            this.shortaddress2 = shortaddress2[0].long_name;
          } else {
            this.shortaddress2 = '';
          }

          this.shortaddress = this.shortaddress1 + ", " + this.shortaddress2 + ", " + this.city;
          this.area = this.shortaddress2;
          //this.buildingType.filter(function (item) { return item.val == param.val }).map(data => { data.isChecked = true, this.selectedBuildingType = data.val });

        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

}
