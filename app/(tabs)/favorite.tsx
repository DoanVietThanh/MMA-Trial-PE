import { Feather } from '@expo/vector-icons';
import { Stack, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import CardItem from '~/components/ui/card-item';
import { useFavorites } from '~/context/favorite.context';
import { Player } from '~/types/player.types';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Home() {
  const { favorites, removeFavoriteItems } = useFavorites();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      setSelectedItems([]);
    }, [])
  );

  const handleSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleRemove = () => {
    if (selectedItems.length > 0) {
      Alert.alert(
        'Confirm Removal',
        `Are you sure you want to remove ${selectedItems.length} favorite item(s)?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              removeFavoriteItems(selectedItems);
              setSelectedItems([]);
            },
          },
        ]
      );
    }
  };

  return (
    <View className="px-4">
      <Stack.Screen options={{ title: 'Favorites' }} />
      <View className="flex-row justify-between py-4">
        {favorites.length == 0 && (
          <View className="flex h-full w-full items-center justify-center">
            <FontAwesome name="heart-o" size={60} color="#d1d5db" />
            <Text className="pt-4 text-center text-2xl font-semibold text-gray-300">
              No favorites yet
            </Text>
          </View>
        )}
        {favorites.length > 1 && (
          <TouchableOpacity
            onPress={() => setSelectedItems(favorites.map((fav) => fav.id))}
            className="rounded-full bg-blue-500 px-4 py-2 shadow-md">
            <Text className="font-semibold text-white">
              Select All {selectedItems.length > 0 && `(${selectedItems.length})`}
            </Text>
          </TouchableOpacity>
        )}

        {selectedItems.length >= 2 && (
          <TouchableOpacity
            onPress={() => setSelectedItems([])}
            className="rounded-full bg-red-500 px-4 py-2 shadow-md">
            <Text className="font-semibold text-white">Deselect All</Text>
          </TouchableOpacity>
        )}

        {selectedItems.length > 0 && (
          <TouchableOpacity onPress={handleRemove} className="flex-row items-center">
            <Feather name="trash-2" size={24} color="red" />
            <Text className="ml-2 font-semibold text-red-500">Remove</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={favorites}
        keyExtractor={(tool) => tool.id}
        contentContainerStyle={{ paddingBottom: 60 }}
        renderItem={({ item }: { item: Player }) => {
          return (
            <CardItem
              player={item}
              isShownCheckbox={true}
              onSelect={handleSelect}
              selected={selectedItems.includes(item.id)}
            />
          );
        }}
      />
    </View>
  );
}
