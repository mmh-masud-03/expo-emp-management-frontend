import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import { useRouter } from "expo-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EmployeeTable from "../../components/EmployeeTable";
import { fetchEmployees, deleteEmployee } from "../../services/api";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [totalPages, setTotalPages] = useState(1); // Total pages from the API

  const router = useRouter();

  useEffect(() => {
    loadEmployees(currentPage);
  }, [currentPage]);

  const loadEmployees = async (page) => {
    setLoading(true);
    const data = await fetchEmployees(page);
    const employees = data?.employees;
    setEmployees(employees || []);
    setTotalPages(data?.totalPages || 1); // Set total pages from the API
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    loadEmployees(currentPage);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <View className="flex-1">
      <Header title="Employees" showAddButton showBackButton />
      <View className="flex-1">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : employees.length > 0 ? (
          <>
            <EmployeeTable employees={employees} onDelete={handleDelete} />
            <View className="flex-row justify-around items-center p-4">
              <Button
                title="Previous"
                onPress={handlePrevPage}
                disabled={currentPage === 1}
              />
              <Text>
                Page {currentPage} of {totalPages}
              </Text>
              <Button
                title="Next"
                onPress={handleNextPage}
                disabled={currentPage === totalPages}
              />
            </View>
          </>
        ) : (
          <Text className="text-center mt-4">No employees found</Text>
        )}
      </View>
      {/* <Footer /> */}
    </View>
  );
};

export default EmployeesPage;
