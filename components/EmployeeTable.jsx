import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import EmployeeDetailsModal from "./EmployeeDeatilsModal";

const EmployeeTable = ({
  employees,
  onDelete,
  ListHeaderComponent,
  ListFooterComponent,
}) => {
  const router = useRouter();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const openDeleteModal = (id) => {
    setSelectedEmployeeId(id);
    setDeleteModalVisible(true);
  };

  const openDetailsModal = (employee) => {
    setSelectedEmployee(employee);
    setDetailsModalVisible(true);
  };

  const handleDelete = () => {
    if (selectedEmployeeId) {
      onDelete(selectedEmployeeId);
      setDeleteModalVisible(false);
      setSelectedEmployeeId(null);
    }
  };

  const renderItem = ({ item }) => (
    <View className="flex-row items-center py-4 px-4 border-b border-gray-200">
      <Image
        source={{
          uri: "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
        }}
        className="w-10 h-10 rounded-full mr-4"
      />
      <View className="flex-1">
        <Text className="font-semibold text-gray-800">{item.name}</Text>
        <Text className="text-gray-600 text-sm">{item.designation}</Text>
      </View>
      <View className="flex-row">
        <TouchableOpacity
          onPress={() => openDetailsModal(item)}
          className="p-2 bg-blue-100 rounded-full mr-2"
        >
          <FontAwesome5 name="eye" size={16} color="#3b82f6" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push(`/edit/${item._id}`)}
          className="p-2 bg-green-100 rounded-full mr-2"
        >
          <FontAwesome5 name="edit" size={16} color="#10b981" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openDeleteModal(item._id)}
          className="p-2 bg-red-100 rounded-full"
        >
          <FontAwesome5 name="trash-alt" size={16} color="#ef4444" />
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
        className="bg-white"
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
      />
      <Modal
        transparent={true}
        animationType="fade"
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-6 rounded-lg w-4/5">
            <Text className="text-xl font-bold mb-4 text-gray-800">
              Confirm Deletion
            </Text>
            <Text className="text-gray-600 mb-6">
              Are you sure you want to delete this employee? This action cannot
              be undone.
            </Text>
            <View className="flex-row justify-end">
              <TouchableOpacity
                onPress={() => setDeleteModalVisible(false)}
                className="bg-gray-200 py-2 px-4 rounded-lg mr-4"
              >
                <Text className="font-semibold text-gray-800">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                className="bg-red-500 py-2 px-4 rounded-lg"
              >
                <Text className="font-semibold text-white">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <EmployeeDetailsModal
        visible={detailsModalVisible}
        onClose={() => setDetailsModalVisible(false)}
        employee={selectedEmployee}
      />
    </View>
  );
};

export default EmployeeTable;
