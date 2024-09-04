import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="bg-blue-700 w-full h-[85vh]">
      <Text
        style={{
          fontSize: 22,

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}
