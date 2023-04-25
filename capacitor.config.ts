import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = { 
  appId: 'com.dealapp.app',
  appName: 'Deal Buy Sell',
  webDir: 'www',
  bundledWebRuntime: false,

  plugins: { 
    SplashScreen: {
      launchAutoHide: false,
      showSpinner: false,
      androidScaleType: "CENTER_CROP",
    },
  },
};

export default config;

