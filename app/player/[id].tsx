import { Feather } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { getPlayer } from '~/api/player.api';
import { useFavorites } from '~/context/favorite.context';
import { Player } from '~/types/player.types';

export default function PlayerDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { isFavorite, addFavorite } = useFavorites();
  const [player, setPlayer] = useState<Player>();

  useEffect(() => {
    async function fetchData() {
      try {
        const resPlayer = await getPlayer(id as string);
        setPlayer(resPlayer);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [id]);

  const isActive = player ? isFavorite(player.id) : false;

  if (!player) {
    return null;
  }

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
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
              className="rounded-full border border-gray-300 bg-white p-2 shadow-md"
              onPress={() => router.back()}>
              <Feather name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View className="flex-row items-center space-x-4">
              <TouchableOpacity
                className="rounded-full border border-gray-300 bg-white p-2 shadow-md"
                onPress={() => handleAddFavorite()}>
                <Feather name="heart" size={24} color={isActive ? 'red' : 'gray'} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <ScrollView className="bg-gray-100">
        <View className="h-96 w-full">
          <Image
            source={{ uri: player.image }}
            className="h-full w-full object-cover"
            resizeMode="cover"
          />
        </View>

        <View className="p-6">
          <View className="space-y-4">
            <Text className="text-2xl font-semibold text-gray-800">{player.playerName}</Text>
            <Text className="text-lg text-gray-600">Team: {player.team}</Text>
            <Text className="text-lg text-gray-600">Year of Birth: {player.YoB}</Text>
            <Text className="text-lg text-gray-600">
              Captain: {player.isCaptain ? 'Yes' : 'No'}
            </Text>
            <Text className="text-lg text-gray-600">Minutes Played: {player.minutesPlayed}</Text>
            <Text className="text-lg text-gray-600">
              Passing Accuracy: {player.passingAccuracy}%
            </Text>
            <Text className="text-lg text-gray-600">Position: {player.position}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
