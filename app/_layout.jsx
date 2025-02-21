import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      <Stack.Screen name="index" options={{ title: "Register", headerShown: false }} />
      <Stack.Screen name="login" options={{ title: "Login", headerShown: false }} />
      <Stack.Screen name="register" options={{ title: "Register", headerShown: false }} />
      <Stack.Screen name="+not-found" options={{ title: "Not Found", headerShown: false }} />
    </Stack>
  );
}