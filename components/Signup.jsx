import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const API_URL = 'http://localhost:5000'; // Replace with your actual API URL

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred during signup');
      }

      const { userId, token } = data;
      
      // Here you would typically store the token and userId in secure storage
      // For example: await SecureStore.setItemAsync('userToken', token);
      
      // Navigate to the main app
      router.replace('/');
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', error.message || 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center p-6 bg-white">
      <Text className="text-3xl font-bold mb-6 text-center">Sign Up</Text>
      <TextInput
        className="w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg ${isLoading ? 'opacity-50' : ''}`}
        onPress={handleSignup}
        disabled={isLoading}
      >
        <Text className="text-center text-white font-bold">
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="mt-4"
        onPress={() => router.push('/login')}
      >
        <Text className="text-center text-blue-500">Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}