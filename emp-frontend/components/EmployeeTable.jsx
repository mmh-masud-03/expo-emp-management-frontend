import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const EmployeeTable = ({ employees, onDelete }) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const openDeleteModal = (id) => {
    setSelectedEmployeeId(id);
    setModalVisible(true);
  };

  const handleDelete = () => {
    if (selectedEmployeeId) {
      onDelete(selectedEmployeeId);
      setModalVisible(false);
      setSelectedEmployeeId(null);
    }
  };

  const renderItem = ({ item }) => (
    <View className="flex-row items-center justify-between py-4 border-b border-gray-200">
      <View>
        <Text className="font-semibold">{item.name}</Text>
        <Text className="text-gray-600">{item.designation}</Text>
      </View>
      <View className="flex-row gap-2">
        <TouchableOpacity
          onPress={() => router.push(`/edit/${item._id}`)}
          className="mr-2"
        >
          <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openDeleteModal(item._id)}>
          <FontAwesome name="trash-o" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1">
      <FlatList
        data={employees}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        className="p-4 bg-slate-100"
      />
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-6 rounded-lg">
            <Text className="text-lg font-semibold mb-4">Confirm Deletion</Text>
            <Text>Are you sure you want to delete this employee?</Text>
            <View className="flex-row justify-between mt-4">
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Delete" color="red" onPress={handleDelete} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EmployeeTable;
