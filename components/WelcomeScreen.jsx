import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
// import { Users } from "lucide-react-native";
import { Users } from "@expo/vector-icons"; // Import icons from @expo/vector-icons
import Header from "../components/Header";
import Footer from "../components/Footer";

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1">
      <Header title="Welcome" />
      <View className="flex-1 justify-center items-center p-4">
        <Users color="#3b82f6" size={64} />
        <Text className="text-2xl font-bold mt-4 mb-2">
          Employee Management System
        </Text>
        <Text className="text-gray-600 text-center mb-8">
          Efficiently manage your workforce with our easy-to-use system.
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/employees")}
          className="bg-blue-600 py-3 px-6 rounded-full"
        >
          <Text className="text-white font-semibold">View Employees</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

export default WelcomeScreen;
