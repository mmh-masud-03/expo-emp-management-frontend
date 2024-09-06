import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import EmployeeForm from "../../components/EmployeeForm"; // Adjust the path as needed
import { fetchEmployeeById, updateEmployee } from "../../services/api";

const Update = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Get the employee ID from the route
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await fetchEmployeeById(id); // Fetch the employee data
        setEmployee(data);
      } catch (error) {
        Alert.alert("Error", "Failed to load employee data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const handleUpdate = async (updatedEmployee) => {
    try {
      const response = await updateEmployee(id, updatedEmployee);

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      Alert.alert("Success", "Employee updated successfully");
      router.replace("/employees"); // Navigate back to the employees list
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View className="flex-1">
      <View className="flex-row items-center justify-start bg-blue-600 p-4 mt-8">
        <TouchableOpacity
          onPress={() => router.replace("/employees")}
          className="mr-2"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Update Employee</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : employee ? (
        <EmployeeForm initialValues={employee} onSubmit={handleUpdate} />
      ) : (
        <Text className="p-4 text-center text-red-500">
          Employee not found.
        </Text>
      )}
    </View>
  );
};

export default Update;
