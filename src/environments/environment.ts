// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBTbtL8MajufNeBZLaUtvomRk0bSsx5Y9M",
    authDomain: "deal-orion.firebaseapp.com",
    projectId: "deal-orion",
    storageBucket: "deal-orion.appspot.com",
    messagingSenderId: "474043130074",
    appId: "1:474043130074:web:09bf6759599904091105e3",
    measurementId: "G-XFPV9MPNVV"
  },
  google_maps_api_key: 'AIzaSyAVQpa7Ag0t1iBHss9gOoidciOYre3mwD4', 
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
