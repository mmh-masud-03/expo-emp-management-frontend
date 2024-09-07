import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Using Ionicons as mentioned earlier

const Header = ({ title, showBackButton = false, showAddButton = false }) => {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between bg-blue-950 p-4 mt-8">
      <View className="flex-row items-center">
        {showBackButton && (
          <TouchableOpacity onPress={() => router.back()} className="mr-2">
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        )}
        <Text className="text-white text-xl font-bold">{title}</Text>
      </View>
      {showAddButton && (
        <TouchableOpacity onPress={() => router.push("/add-employee")}>
          <Ionicons name="person-add" size={24} color="#ffffff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
