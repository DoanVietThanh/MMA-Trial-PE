import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Image, Text, View } from 'react-native';

const UserControl = () => {
  return (
    <View>
      <View className="w-full flex-row items-center justify-between">
        <Image
          src="https://avatar.iran.liara.run/public/boy?username=XXX"
          className="h-10 w-10 rounded-full border-2 border-teal-800"
        />

        {/* <View className="flex-row items-center gap-2">
          <FontAwesome size={40} name="user-secret" color={'gray'} />
          <View className="flex">
            <Text className="text-sm">Hello !</Text>
            <Text className="font-semibold">Admin</Text>
          </View>
        </View> */}
        <View className="rounded-full bg-gray-100 p-2">
          <FontAwesome size={20} name="bell" color={'gray'} />
        </View>
      </View>

      <Text className="font-pmedium mt-4 text-lg text-gray-500">Hello, XXX!</Text>

      <Text className="font-pmedium mt-2 text-2xl">
        Make your <Text className="text-teal-800">dreams team</Text> come true
      </Text>
    </View>
  );
};

export default UserControl;
