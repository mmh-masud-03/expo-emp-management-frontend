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
              return <FontAwesome name={iconName} size={24} color={color} />;
            case "employees":
              iconName = "users";
              return <FontAwesome6 name={iconName} size={21} color={color} />;
            case "add-employee":
              iconName = "user-plus";
              return <FontAwesome6 name={iconName} size={20} color={color} />;
            case "search":
              iconName = "magnifying-glass";
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
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Tabs.Screen
        name="employees"
        options={{ title: "Employees", headerShown: false }}
      />
      <Tabs.Screen
        name="search"
        options={{ title: "Search", headerShown: false }}
      />
      <Tabs.Screen
        name="add-employee"
        options={{ title: "Add Employee", headerShown: false }}
      />
    </Tabs>
  );
}
