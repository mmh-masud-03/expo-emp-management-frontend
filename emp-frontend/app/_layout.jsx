// app/layout.js or app/_layout.js
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
        {/* You can add other non-tab screens here */}
      </Stack>
    </SafeAreaView>
  );
}
