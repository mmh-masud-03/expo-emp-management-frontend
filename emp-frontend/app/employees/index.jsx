import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EmployeeTable from "../../components/EmployeeTable";
import { fetchEmployees, deleteEmployee } from "../../services/api";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const data = await fetchEmployees();
    setEmployees(data);
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    loadEmployees();
  };

  return (
    <View className="flex-1">
      <Header title="Employees" showAddButton />
      <View className="flex-1">
        {employees.length > 0 ? (
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
