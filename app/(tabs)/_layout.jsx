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
            case "index":
              iconName = "home";
              return <FontAwesome name={iconName} size={28} color={color} />;
            case "employees":
              iconName = "users";
              return <FontAwesome6 name={iconName} size={28} color={color} />;
            case "add-employee":
              iconName = "user-plus";
              return <FontAwesome6 name={iconName} size={28} color={color} />;
            case "account":
              iconName = "user";
              return <FontAwesome6 name={iconName} size={28} color={color} />;
            default:
              return null;
          }
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Tabs.Screen
        name="employees"
        options={{ title: "Employees", headerShown: false }}
      />
      <Tabs.Screen
        name="add-employee"
        options={{ title: "Add Employee", headerShown: false }}
      />
      <Tabs.Screen
        name="account"
        options={{ title: "Account", headerShown: false }}
      />
    </Tabs>
  );
}
