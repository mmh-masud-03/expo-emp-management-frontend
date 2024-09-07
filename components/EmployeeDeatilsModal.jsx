import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const EmployeeDetailsModal = ({ visible, onClose, employee }) => {
  if (!employee) return null;

  const DetailItem = ({
    icon,
    label,
    value,
    iconColor = "#4B5563",
    valueColor = "#1F2937",
  }) => (
    <View className="flex-row items-center mb-4 bg-white rounded-lg p-3 shadow-sm">
      <View className="bg-gray-100 rounded-full p-2 mr-4">
        <MaterialIcons name={icon} size={24} color={iconColor} />
      </View>
      <View className="flex-1">
        <Text className="text-sm text-gray-500 mb-1">{label}</Text>
        <Text className="text-base font-medium" style={{ color: valueColor }}>
          {value}
        </Text>
      </View>
    </View>
  );

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black bg-opacity-50">
        <View className="bg-gray-50 rounded-t-3xl p-6 h-5/6">
          <TouchableOpacity
            onPress={onClose}
            className="absolute top-4 right-4 z-10"
          >
            <AntDesign name="closecircle" size={28} color="#4B5563" />
          </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="items-center mb-6">
              <Image
                source={{
                  uri:
                    employee.avatar ||
                    "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
                }}
                className="w-32 h-32 rounded-full border-4 border-white shadow-md"
              />
              <Text className="text-2xl font-bold mt-4 text-gray-800">
                {employee.name}
              </Text>
              <Text className="text-lg text-gray-600">
                {employee.designation}
              </Text>
            </View>
            <View className="space-y-2">
              <DetailItem
                icon="badge"
                label="Employee ID"
                value={employee.employeeId}
                iconColor="#3B82F6"
              />
              <DetailItem
                icon="phone"
                label="Contact"
                value={employee.contact}
                iconColor="#10B981"
              />
              <DetailItem
                icon="email"
                label="Email"
                value={employee.email}
                iconColor="#F59E0B"
              />
              <DetailItem
                icon="business"
                label="Department"
                value={employee.department}
                iconColor="#8B5CF6"
              />
              <DetailItem
                icon="date-range"
                label="Join Date"
                value={employee.joinDate}
                iconColor="#EC4899"
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default EmployeeDetailsModal;
