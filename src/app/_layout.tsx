import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore if already hidden */
});

export default function RootLayout() {
  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      SplashScreen.hideAsync().catch(() => {
        /* ignore hide errors */
      });
    }, 3000);

    return () => clearTimeout(splashTimeout);
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
