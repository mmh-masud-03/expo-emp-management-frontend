import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { debounce } from "lodash";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EmployeeDetailsModal from "../../components/EmployeeDeatilsModal";
import { FontAwesome6 } from "@expo/vector-icons";
import { searchEmployee } from "../../services/api";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const handleSearch = useCallback(
    debounce(async (term) => {
      if (term.trim() === "") {
        setSearchResults([]);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const response = await searchEmployee(term);
        setSearchResults(response?.employees || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("An error occurred while searching. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  const handleRefresh = () => {
    if (searchTerm.trim() !== "") {
      handleSearch(searchTerm);
    }
  };

  const openEmployeeDetails = (employee) => {
    setSelectedEmployee(employee);
    setIsModalVisible(true);
  };

  const renderEmployeeItem = ({ item }) => (
    <View className="flex-row items-center justify-between p-4 mb-2 bg-white rounded-lg shadow">
      <View className="flex-1">
        <Text className="text-lg font-semibold">{item.name}</Text>
        <Text className="text-gray-600">{item.designation}</Text>
        <Text className="text-gray-500">ID: {item.employeeId}</Text>
      </View>
      <TouchableOpacity
        onPress={() => openEmployeeDetails(item)}
        className="p-2"
      >
        <FontAwesome6 name="eye" size={20} color="#3B82F6" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100" style={{ paddingTop: insets.top }}>
      <Header title="Search Employees" />
      <View className="px-4 py-2">
        <View className="flex flex-row items-center bg-white p-2 rounded-lg shadow">
          <FontAwesome6
            name="magnifying-glass"
            size={20}
            color="gray"
            className="mr-2"
          />
          <TextInput
            placeholder="Search by name, ID, or designation"
            value={searchTerm}
            onChangeText={(text) => {
              setSearchTerm(text);
              handleSearch(text);
            }}
            className="flex-1 ml-2 text-base"
            autoCapitalize="none"
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity onPress={() => setSearchTerm("")}>
              <FontAwesome6 name="times-circle" size={20} color="gray" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View className="flex-1 px-4">
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-4" />
        ) : error ? (
          <Text className="text-center text-red-500 mt-4">{error}</Text>
        ) : searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.employeeId.toString()}
            renderItem={renderEmployeeItem}
            contentContainerStyle={{ paddingVertical: 8 }}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={handleRefresh}
              />
            }
          />
        ) : searchTerm.trim() !== "" ? (
          <Text className="text-center text-gray-500 mt-4">
            No employees found. Try a different search term.
          </Text>
        ) : (
          <Text className="text-center text-gray-500 mt-4">
            Start typing to search for employees.
          </Text>
        )}
      </View>
      <Footer />
      <EmployeeDetailsModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        employee={selectedEmployee}
      />
    </View>
  );
};

export default Search;
