import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Player } from '~/types/player.types';

type CardItemProps = {
  player: Player;
};

const CardItem = ({ player }: CardItemProps) => {
  const router = useRouter();

  return (
    <Pressable
      key={player.id}
      onPress={() => router.push(`/player/${player.id}` as Href)}
      className="mb-4 flex-row rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
      <View className="relative w-1/3">
        <Image
          source={{ uri: player.image }}
          className="mb-2 h-32 w-full rounded-lg"
          resizeMode="cover"
        />
        <Ionicons
          name="heart"
          size={24}
          color="red"
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        />
      </View>
      <View className="flex-1 pl-4">
        <Text className="mb-1 text-lg font-extrabold text-blue-900" numberOfLines={2}>
          {player.playerName}
        </Text>
        <Text className="mb-2 self-start rounded-lg bg-green-500 px-2 py-1 text-sm italic text-white">
          {player.team}
        </Text>
        <Text className="text-sm text-gray-600">Age: {player.age}</Text>
        <Text className="text-sm text-gray-600">Captain: {player.isCaptain ? 'Yes' : 'No'}</Text>
        <Text className="text-sm text-gray-600">Position: {player.position}</Text>
      </View>
    </Pressable>
  );
};

export default CardItem;
