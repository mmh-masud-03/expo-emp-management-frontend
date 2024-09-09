// app/(tabs)/_layout.js
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "login":
              iconName = "home";
              return <FontAwesome name={iconName} size={24} color={color} />;
            case "signup":
              iconName = "users";
              return <FontAwesome6 name={iconName} size={21} color={color} />;
            default:
              return null;
          }
        },
        tabBarActiveTintColor: "darkblue",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopColor: "lightgray",
          borderTopWidth: 1,
          paddingTop: 5,
          height: 50,
        },
      })}
    >
      <Tabs.Screen
        name="login"
        options={{ title: "Home", headerShown: false }}
      />
      <Tabs.Screen
        name="signup"
        options={{ title: "Employees", headerShown: false }}
      />
     
    </Tabs>
  );
}
