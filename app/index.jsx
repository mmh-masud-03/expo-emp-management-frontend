import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";


const FeatureCard = ({ icon, title, description }) => (
  <View className="bg-white rounded-lg p-4 shadow-md mb-4">
    <FontAwesome5 name={icon} size={24} color="#3b82f6" />
    <Text className="text-lg font-semibold mt-2 mb-1">{title}</Text>
    <Text className="text-gray-600">{description}</Text>
  </View>
);

const WelcomeScreen = () => {
  const router = useRouter();

  const features = [
    {
      icon: "user-plus",
      title: "Create Employees",
      description: "Easily add new employees to the system.",
    },
    {
      icon: "users",
      title: "Manage Team",
      description: "View and edit employee information effortlessly.",
    },
    {
      icon: "search",
      title: "Quick Search",
      description: "Find employee details in seconds.",
    },
    {
      icon: "user-shield",
      title: "Role-Based Access",
      description: "Ensure data security with customized permissions.",
    },
  ];

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 p-4">
        <View className="items-center mb-6">
          <Image
            source={require("../assets/images/fsib.jpg")}
            className="w-32 h-32 rounded-full"
          />
          <Text className="text-2xl font-bold mt-4 mb-8 text-blue-600 text-center">
            Employee Management System
          </Text>
          <Text className="text-gray-600 text-center mb-3">
            Streamline your workforce management with our powerful and intuitive
            platform.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/")}
          className="bg-blue-600 py-2 px-4 rounded-lg mb-8"
        >
          <Text className="text-white font-semibold text-center text-lg">
            View Employees
          </Text>
        </TouchableOpacity>

        <Text className="text-2xl font-semibold mb-4">Key Features</Text>
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}

        <TouchableOpacity
          onPress={() => router.push("/")}
          className="bg-green-950 p-1  rounded-lg flex mt-6"
        >
          <Text className="text-white font-semibold text-center text-lg mb-7">
            Get Started
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default WelcomeScreen;
