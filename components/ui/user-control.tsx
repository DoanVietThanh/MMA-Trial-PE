import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Text, View } from 'react-native';

const UserControl = () => {
  return (
    <View className="w-full flex-row items-center justify-between p-4 py-2">
      <View className="flex-row items-center gap-2">
        <FontAwesome size={40} name="user-secret" color={'gray'} />
        <View className="flex">
          <Text className="text-sm">Hello !</Text>
          <Text className="font-semibold">Thanh Doan</Text>
        </View>
      </View>
      <View className="rounded-full bg-gray-100 p-2">
        <FontAwesome size={20} name="bell" color={'gray'} />
      </View>
    </View>
  );
};

export default UserControl;
