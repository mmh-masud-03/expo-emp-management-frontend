import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const EmployeeForm = ({ onSubmit, initialValues = {} }) => {
  const [employee, setEmployee] = useState({
    employeeId: "",
    name: "",
    designation: "",
    contact: "",
    email: "",
    ...initialValues,
  });

  const handleChange = (name, value) => {
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(employee);
  };

  return (
    <View className="p-4">
      <TextInput
        className="border border-gray-300 rounded-md p-2 mb-4"
        placeholder="Employee ID"
        value={employee.employeeId}
        onChangeText={(text) => handleChange("employeeId", text)}
      />
      <TextInput
        className="border border-gray-300 rounded-md p-2 mb-4"
        placeholder="Name"
        value={employee.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        className="border border-gray-300 rounded-md p-2 mb-4"
        placeholder="Designation"
        value={employee.designation}
        onChangeText={(text) => handleChange("designation", text)}
      />
      <TextInput
        className="border border-gray-300 rounded-md p-2 mb-4"
        placeholder="Contact"
        value={employee.contact}
        onChangeText={(text) => handleChange("contact", text)}
      />
      <TextInput
        className="border border-gray-300 rounded-md p-2 mb-4"
        placeholder="Email"
        value={employee.email}
        onChangeText={(text) => handleChange("email", text)}
        keyboardType="email-address"
      />
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-blue-600 py-3 rounded-md"
      >
        <Text className="text-white text-center font-semibold">
          {initialValues.id ? "Update Employee" : "Add Employee"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmployeeForm;
