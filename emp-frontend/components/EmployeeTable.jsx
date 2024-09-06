import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const EmployeeTable = ({ employees, onDelete }) => {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <View className="flex-row items-center justify-between py-4 border-b border-gray-200">
      <View>
        <Text className="font-semibold">{item.name}</Text>
        <Text className="text-gray-600">{item.designation}</Text>
      </View>
      <View className="flex-row">
        <TouchableOpacity
          onPress={() => router.push(`/edit-employee?id=${item.id}`)}
          className="mr-2"
        >
          <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <FontAwesome name="trash-o" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={employees}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      className="p-4"
    />
  );
};

export default EmployeeTable;
