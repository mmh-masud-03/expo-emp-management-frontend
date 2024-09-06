import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
const Update = () => {
  const router = useRouter();

  return (
    <View>
      <View className="flex-row items-center justify-start bg-blue-600 p-4 mt-8">
        <TouchableOpacity
          onPress={() => router.replace("/employees")}
          className="mr-2"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text className="text-white text-xl font-bold">Update Employee</Text>
      </View>{" "}
      <Text>Update</Text>
    </View>
  );
};

export default Update;
