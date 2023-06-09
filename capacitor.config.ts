import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = { 
  appId: 'com.dealorion.app',
  appName: 'Find Around Here',
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

