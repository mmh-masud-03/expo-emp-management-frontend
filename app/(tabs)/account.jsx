import { View, Text } from "react-native";
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
const Account = () => {
  return (
    <View className="flex-1">
      <Header title="Account" />
      <Text className="h-[80vh] text-center my-auto">Account</Text>
      <Footer />
    </View>
  );
};

export default Account;
