import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, Pressable, Text, View } from 'react-native';
import { useFavorites } from '~/context/favorite.context';
import { Player } from '~/types/player.types';

type CardItemProps = {
  player: Player;
  onSelect?: (id: string) => void;
  selected?: boolean;
  isShownCheckbox?: boolean;
};

const CardItem = ({ player, onSelect, selected, isShownCheckbox = false }: CardItemProps) => {
  const router = useRouter();
  const { addFavorite, isFavorite } = useFavorites();
  const isActive = isFavorite(player.id);

  const handleAddFavorite = () => {
    if (isActive) {
      Alert.alert('Confirm Removal', `Are you sure you want to remove favorite item(s)?`, [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => addFavorite(player.id),
        },
      ]);
    } else {
      addFavorite(player.id);
    }
  };

  return (
    <View
      key={player.id}
      className="mb-4 flex-row rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
      {isShownCheckbox && (
        <View className="flex w-1/12 items-center justify-center">
          <Pressable onPress={() => onSelect && onSelect(player.id)}>
            <Ionicons
              name={selected ? 'checkbox' : 'square-outline'}
              size={24}
              color={selected ? 'green' : 'gray'}
            />
          </Pressable>
        </View>
      )}

      <View className="relative w-1/3">
        <Pressable onPress={() => router.push(`/player/${player.id}` as Href)}>
          <Image
            source={{ uri: player.image }}
            className="aspect-square w-full rounded-lg"
            resizeMode="cover"
          />
        </Pressable>
        <Ionicons
          name="heart"
          size={24}
          onPress={() => handleAddFavorite()}
          color={isActive ? 'red' : 'gray'}
          className="absolute right-2 top-2"
        />

        {player.isCaptain && (
          <View className="absolute left-2 top-2 rounded-full bg-yellow-500 px-2 py-1">
            <Text className="text-xs text-white">Captain</Text>
          </View>
        )}
      </View>
      <View className="flex-1 pl-4">
        <Text
          numberOfLines={2}
          className="mb-1 text-lg font-extrabold text-blue-900"
          onPress={() => router.push(`/player/${player.id}` as Href)}>
          {player.playerName}
        </Text>
        <Text>{player.team}</Text>
        <Text className="text-sm text-gray-600">Age: {2024 - player.YoB}</Text>

        <Text className="text-sm text-gray-600">Position: {player.position}</Text>
        <Text className="text-sm text-gray-600">Minutes Played: {player.minutesPlayed}</Text>
      </View>
    </View>
  );
};

export default CardItem;
