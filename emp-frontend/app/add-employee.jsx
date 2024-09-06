import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EmployeeForm from "../components/EmployeeForm";
import { addEmployee } from "../services/api";

const AddEmployeePage = () => {
  const router = useRouter();

  const handleSubmit = async (employeeData) => {
    await addEmployee(employeeData);
    router.push("/employees");
  };

  return (
    <View className="flex-1">
      <Header title="Add Employee" showBackButton />
      <View className="flex-1">
        <EmployeeForm onSubmit={handleSubmit} />
      </View>
      <Footer />
    </View>
  );
};

export default AddEmployeePage;
