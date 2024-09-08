import React from 'react';
import { Link, Stack } from 'expo-router';
import { Text, View, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Page Not Found', headerStyle: { backgroundColor: '#3498db' }, headerTintColor: '#fff' }} />
      <View className="flex-1 bg-gray-100">
        <View className="flex-1 items-center justify-center p-8">
          <Image
            source={require('../assets/images/fsib-logo.png')}
            className="w-40 h-40 rounded-full mb-8"
          />
          <MaterialIcons name="error-outline" size={80} color="#e74c3c" />
          <Text className="text-3xl font-bold mt-4 text-gray-800">Oops!</Text>
          <Text className="text-xl text-center mt-2 text-gray-600">This page doesn't exist in our employee database.</Text>
          <Text className="text-md text-center mt-4 text-gray-500">
            The page you're looking for might have been moved, deleted, or never existed.
          </Text>
          <Link href="/" className="mt-8 bg-blue-500 py-3 px-6 rounded-full">
            <Text className="text-white font-semibold">Return to Home</Text>
          </Link>
        </View>
        <View className="bg-gray-200 p-4">
          <Text className="text-center text-gray-600">
            Employee Management System | © 2024 FSIB PLC
          </Text>
        </View>
      </View>
    </>
  );
}