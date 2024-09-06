import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import "./globals.css"; // Your global styles

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false, // Disable default headers if you want custom headers
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="edit/[id]" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}
