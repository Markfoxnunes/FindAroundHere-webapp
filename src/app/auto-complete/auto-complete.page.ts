/*
  Authors : Craft Software System
  Website : https://craftsofts.com/
  App Name : Deal - ionic 6 Buy and Sell, Admin, Admob
  Created : 20-August-2022
  This App Template Source code is licensed as per the
  terms found in the Website https://craftsofts.com/license
  Copyright © 2022-present Craft Software System.
*/
import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { PlaceService } from '../services/place.service';

declare var google: any;

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.page.html',
  styleUrls: ['./auto-complete.page.scss'],
})
export class AutoCompletePage implements OnInit {

  @ViewChild('map', { static: true }) mapEle: ElementRef;
  public autocompleteItems: any;
  public map: any;
  public marker: any
  public autocomplete: any;
  public acService:any;
  public placesService: any;
  public latitude: number;
  public longitude: number;
  public latlong: any;
  public location: any;
  public address: any;
  public service = new google.maps.places.AutocompleteService();
  public locality: any;

  constructor(
    public placeService: PlaceService,
    public viewCtrl: ModalController, 
    public zone: NgZone, 
    public platform: Platform) {}
  
  ngOnInit() {
    // set autocomplete query empty
    this.acService = new google.maps.places.AutocompleteService();        
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };  
    this.getLocation()
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  remove() {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    }; 
  }

  // get current location as map center
  getLocation() {
    this.platform.ready().then( async () => {
      await Geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 10000, enableHighAccuracy: false }).then((resp) => {
        if (resp) {
          console.log('resp', resp);
          this.latitude = resp.coords.latitude;
          this.longitude = resp.coords.longitude;
          this.loadmap(resp.coords.latitude, resp.coords.longitude, this.mapEle);
          this.getAddress(this.latitude, this.longitude);
        }
      });
    })
  }

  //load map
  loadmap(lat, lng, mapElement) {
    const location = new google.maps.LatLng(lat, lng);
    const style = [
      {
        featureType: 'all',
        elementType: 'all',
        stylers: [
          { saturation: -100 }
        ]
      }
    ];
    const mapOptions = {
      zoom: 15,
      scaleControl: false,
      streetViewControl: false,
      zoomControl: false,
      overviewMapControl: false,
      center: location,
      mapTypeControl: false,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'Deal']
      }
    };
    this.map = new google.maps.Map(mapElement.nativeElement, mapOptions);
    var mapType = new google.maps.StyledMapType(style, { name: 'Grayscale' });
    this.map.mapTypes.set('Deal', mapType);
    this.map.setMapTypeId('Deal');
    this.addMarker(location);
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': this.map.getCenter() }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        // save locality
        this.locality = this.placeService.setLocalityFromGeocoder(results);
        console.log('locality', this.locality);
      }
    })
  }

  // get address from latitude and longitude
  getAddress(lat, lng) {
    const geocoder = new google.maps.Geocoder();
    const location = new google.maps.LatLng(lat, lng);
    geocoder.geocode({ 'location': location }, (results, status) => {
      console.log(results);
      this.address = results[0].formatted_address;
      this.latitude = lat;
      this.longitude = lng;
    });
  }

  // add marker to map
  addMarker(location) {
    console.log('location =>', location)
    //custom icon
    /*const icon = {
      url: 'assets/icon/marker.png',
      scaledSize: new google.maps.Size(50, 50), // scaled size
    }*/
    this.marker = new google.maps.Marker({
      position: location,
      map: this.map,
      //icon: icon,
      draggable: true,
      animation: google.maps.Animation.DROP
    })
    google.maps.event.addListener(this.marker, 'dragend', () => {
      console.log(this.marker);
      this.getDragAddress(this.marker);
    });
  }

  // drag marker to get new address on map
  getDragAddress(event) {
    const geocoder = new google.maps.Geocoder();
    const location = new google.maps.LatLng(event.position.lat(), event.position.lng());
    geocoder.geocode({ 'location': location }, (results, status) => {
      console.log(results);
      this.address = results[0].formatted_address;
      this.latitude = event.position.lat();
      this.longitude = event.position.lng();
    });
  }

  select(){
    this.location = {lat: this.latitude, long: this.longitude, address: this.address, locality: this.locality}
    this.viewCtrl.dismiss(this.location);
  }

  chooseItem(item: any) {
    //convert Address to lat and long
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': item }, (results, status) => {
    this.latitude = results[0].geometry.location.lat();
    this.longitude = results[0].geometry.location.lng();
    this.address = item;
    console.log("lat: " + this.latitude + ", long: " + this.longitude);
    let locality = this.placeService.setLocalityFromGeocoder(results);
    this.location = {lat: this.latitude, long: this.longitude, address: this.address, locality: locality}
    this.viewCtrl.dismiss(this.location);
     });
  }

  updateSearch() {
    // Autocomplete search, if autocomplete query is empty return list of items in an array
    if (this.autocomplete.query == '') {
     this.autocompleteItems = [];
     return;
    }
   // Places prediction, you can add more to it
    let me = this;
    this.service.getPlacePredictions({
    input: this.autocomplete.query,
    componentRestrictions: {country: ['NG', "DZ", "AR", "AU", 'US', "AT", "AZ", "BS", "BH", "BD", "CV", "BE", "BR", "BF", "CM", "CA", "CL", "CN", "CR", "HR", "CU", "CZ", "DK", "EC", "EG", "ET", "FI", "FR", "GA", "GM", "DE", "GH", "IN", "ID", "IR", "IQ", "IL", "IT", "JM", "JP", "JO", "KE", "LB", "LR", "LY", "MW", "MY", "ML", "MX", "MA", "MZ", "NA", "NR", "NP", "NL", "NZ", "NI", "NE", "NO", "PY", "PE", "PH", "PL", "PT", "QA", "RO", "RU", "SA", "SG", "ZA", "ES", "LK", "SE", "CH", "SI", "TW", "TH", "TN", "TR", "GB", "UA", "AE", "UY", "US", "VE", "ZM", "ZW" ]}
   }, (predictions, status) => {
     me.autocompleteItems = [];
   me.zone.run(() => {
     if (predictions != null) {
        predictions.forEach((prediction) => {
          me.autocompleteItems.push(prediction.description);
        });
       }
     });
   });
  }

}
