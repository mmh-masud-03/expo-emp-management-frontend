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
import EmployeeForm from "../../components/EmployeeForm"; 
import { fetchEmployeeById, updateEmployee } from "../../services/api";

const Update = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await fetchEmployeeById(id);
        setEmployee(data);
      } catch (error) {
        console.error("Error fetching employee:", error);
        Alert.alert("Error", "Failed to load employee data");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const handleUpdate = async (updatedEmployee) => {
    setIsLoading(true);
    try {
      const response = await updateEmployee(id, updatedEmployee);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update employee");
      }

      Alert.alert(
        "Success",
        "Employee updated successfully",
        [
          {
            text: "OK",
            onPress: () => router.replace("/employees")
          }
        ]
      );
    } catch (error) {
      console.error("Error updating employee:", error);
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1">
      <View className="flex-row items-center justify-start bg-blue-950 p-4 mt-8">
        <TouchableOpacity
          onPress={() => router.replace("/employees")}
          className="mr-2"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Update Employee</Text>
      </View>

      {employee && !isLoading ? (
        <EmployeeForm initialValues={employee} onSubmit={handleUpdate} />
      ) : (
        <Text className="p-4 text-center text-red-500">
          {isLoading ? "" : "Employee not found."}
        </Text>
      )}

      {isLoading && (
        <View className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <ActivityIndicator size="large" color="#ffffff" />
          <Text className="text-white mt-2">
            {employee ? "Updating..." : "Loading..."}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Update;