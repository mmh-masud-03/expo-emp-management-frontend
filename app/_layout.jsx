import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
// import { useAuth } from "../context/AuthContext"; 
import "./globals.css"; // Your global styles

export default function RootLayout() {
  // const { user } = useAuth(); 
  const isLoggedIn=true;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false, // Disable default headers if you want custom headers
        }}
      >
        {/* Conditionally render screens based on login status */}
        {isLoggedIn ? (
          <>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="edit/[id]" options={{ headerShown: false }} />
          </>
        ) : (
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        )}
      </Stack>
    </SafeAreaView>
  );
}
