import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EmployeeTable from "../../components/EmployeeTable";
import { fetchEmployees, deleteEmployee } from "../../services/api";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const router = useRouter();

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    setLoading(true); // Set loading to true before fetching
    const data = await fetchEmployees();
    const employees = data?.employees;
    setEmployees(employees || []);
    setLoading(false); // Set loading to false after fetching
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    loadEmployees();
  };

  return (
    <View className="flex-1">
      <Header title="Employees" showAddButton />
      <View className="flex-1">
        {loading ? (
          <ActivityIndicator size="large" className="mt-4" /> // Loader component
        ) : employees.length > 0 ? (
          <EmployeeTable employees={employees} onDelete={handleDelete} />
        ) : (
          <Text className="text-center mt-4">No employees found</Text>
        )}
      </View>
      <Footer />
    </View>
  );
};

export default EmployeesPage;
