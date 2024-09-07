import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EmployeeTable from "../../components/EmployeeTable";
import { fetchEmployees, deleteEmployee } from "../../services/api";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();

  useEffect(() => {
    loadEmployees(currentPage);
  }, [currentPage]);

  const loadEmployees = async (page) => {
    setLoading(true);
    const data = await fetchEmployees(page);
    setEmployees(data?.employees || []);
    setTotalPages(data?.totalPages || 1);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    loadEmployees(currentPage);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const renderHeader = () => (
    <View className="px-4 py-6">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold text-gray-800">Employee List</Text>
        <TouchableOpacity
          onPress={() => router.push("/employees/add")}
          className="bg-blue-500 py-2 px-4 rounded-full flex-row items-center"
        >
          <FontAwesome5 name="plus" size={16} color="white" />
          <Text className="text-white font-semibold ml-2">Add New</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View className="px-4 py-6">
      <View className="flex-row justify-between items-center">
        <TouchableOpacity
          onPress={handlePrevPage}
          disabled={currentPage === 1}
          className={`py-2 px-4 rounded-full ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500"
          }`}
        >
          <Text className="text-white font-semibold">Previous</Text>
        </TouchableOpacity>
        <Text className="text-gray-600">
          Page {currentPage} of {totalPages}
        </Text>
        <TouchableOpacity
          onPress={handleNextPage}
          disabled={currentPage === totalPages}
          className={`py-2 px-4 rounded-full ${
            currentPage === totalPages ? "bg-gray-300" : "bg-blue-500"
          }`}
        >
          <Text className="text-white font-semibold">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header title="Employees" showAddButton />
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      ) : employees.length > 0 ? (
        <View className="flex-1">
          <EmployeeTable
            employees={employees}
            onDelete={handleDelete}
            ListFooterComponent={renderFooter}
          />
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <FontAwesome5 name="user-slash" size={48} color="#9ca3af" />
          <Text className="text-lg text-gray-600 mt-4">No employees found</Text>
        </View>
      )}
      <Footer />
    </SafeAreaView>
  );
};

export default EmployeesPage;
