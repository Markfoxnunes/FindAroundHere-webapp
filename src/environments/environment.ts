// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  firebase: {
  apiKey: "AIzaSyDC6Drmw5wbjAmGtFvFudS1Cch6fh8IzzQ",
  authDomain: "olx-clone-6f0b3.firebaseapp.com",
  projectId: "olx-clone-6f0b3",
  storageBucket: "olx-clone-6f0b3.appspot.com",
  messagingSenderId: "356818689538",
  appId: "1:356818689538:web:7a4a6bb5a356556550d11b",
  measurementId: "G-ELJWRY8H5Y"
  },
  google_maps_api_key: '', 
  stripe: {
    sk: ''
  },
  bannerAdId: 'ca-app-pub-8687647491847996/5267242738', 
  interstitialAdId: 'ca-app-pub-8687647491847996/6735133422',
  bannerAdIdiOS: 'ca-app-pub-8687647491847996/7162508838', 
  interstitialAdIdiOS: 'ca-app-pub-8687647491847996/8048215093',
  rewardedAdId: '',
  langArr: [
    { name: 'English', code: 'en' },
    { name: 'French', code: 'fr' }
  ], 

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
