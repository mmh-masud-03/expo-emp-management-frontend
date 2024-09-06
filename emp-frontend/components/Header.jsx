import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Import icons from @expo/vector-icons

const Header = ({ title, showBackButton = false, showAddButton = false }) => {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between bg-blue-600 p-4">
      <View className="flex-row items-center">
        {showBackButton && (
          <TouchableOpacity onPress={() => router.back()} className="mr-2">
            <Ionicons name="arrow-back" size={24} color="white" />{" "}
            {/* Use Ionicons for back button */}
          </TouchableOpacity>
        )}
        <Text className="text-white text-xl font-bold">{title}</Text>
      </View>
      {showAddButton && (
        <TouchableOpacity onPress={() => router.push("/add-employee")}>
          <Ionicons name="person-add" size={24} color="white" />{" "}
          {/* Use Ionicons for add button */}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
