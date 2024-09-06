import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

const EmployeeForm = ({ onSubmit, initialValues = {} }) => {
  const [employee, setEmployee] = useState({
    employeeId: initialValues.employeeId || "",
    name: initialValues.name || "",
    designation: initialValues.designation || "",
    contact: initialValues.contact || "",
    email: initialValues.email || "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (name, value) => {
    setEmployee((prev) => ({ ...prev, [name]: value }));
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "employeeId":
        if (!value) errorMsg = "Employee ID is required.";
        break;
      case "name":
        if (!value) errorMsg = "Name is required.";
        break;
      case "designation":
        if (!value) errorMsg = "Designation is required.";
        break;
      case "contact":
        if (!value) {
          errorMsg = "Contact is required.";
        } else if (!/^\d{11}$/.test(value)) {
          errorMsg = "Contact must be a 11-digit number.";
        }
        break;
      case "email":
        if (!value) {
          errorMsg = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMsg = "Please enter a valid email address.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  const handleSubmit = async () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(employee).forEach((key) => {
      validateInput(key, employee[key]);
      if (!employee[key] || errors[key]) {
        newErrors[key] = errors[key] || "This field is required.";
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (isValid) {
      setLoading(true);
      try {
        await onSubmit(employee);
        Alert.alert("Success", "Employee information saved successfully", [
          {
            text: "OK",
            onPress: () => router.replace("/employees"),
          },
        ]);
      } catch (error) {
        Alert.alert("Error", "Failed to save employee information");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View className="p-4">
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TextInput
            className="border border-gray-300 rounded-md p-2 mb-1"
            placeholder="Employee ID"
            value={employee.employeeId}
            onChangeText={(text) => handleChange("employeeId", text)}
          />
          {errors.employeeId && (
            <Text className="text-red-500 mb-2">{errors.employeeId}</Text>
          )}

          <TextInput
            className="border border-gray-300 rounded-md p-2 mb-1"
            placeholder="Name"
            value={employee.name}
            onChangeText={(text) => handleChange("name", text)}
          />
          {errors.name && (
            <Text className="text-red-500 mb-2">{errors.name}</Text>
          )}

          <TextInput
            className="border border-gray-300 rounded-md p-2 mb-1"
            placeholder="Designation"
            value={employee.designation}
            onChangeText={(text) => handleChange("designation", text)}
          />
          {errors.designation && (
            <Text className="text-red-500 mb-2">{errors.designation}</Text>
          )}

          <TextInput
            className="border border-gray-300 rounded-md p-2 mb-1"
            placeholder="Contact"
            value={employee.contact}
            onChangeText={(text) => handleChange("contact", text)}
            keyboardType="numeric"
          />
          {errors.contact && (
            <Text className="text-red-500 mb-2">{errors.contact}</Text>
          )}

          <TextInput
            className="border border-gray-300 rounded-md p-2 mb-1"
            placeholder="Email"
            value={employee.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
          />
          {errors.email && (
            <Text className="text-red-500 mb-4">{errors.email}</Text>
          )}

          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-blue-600 py-3 rounded-md"
          >
            <Text className="text-white text-center font-semibold">
              {initialValues.employeeId ? "Update Employee" : "Add Employee"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default EmployeeForm;
