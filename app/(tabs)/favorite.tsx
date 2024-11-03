import { Feather } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import CardItem from '~/components/ui/card-item';
import { useFavorites } from '~/context/favorite.context';
import { Player } from '~/types/player.types';

export default function Home() {
  const { favorites, removeFavoriteItems } = useFavorites();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

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
    <>
      <Stack.Screen options={{ title: 'Favoritess' }} />
      <View className="flex-row justify-between p-4">
        {favorites.length == 0 && <Text className="w-full text-red-700">Not found</Text>}
        {favorites.length > 1 && (
          <TouchableOpacity
            onPress={() => setSelectedItems(favorites.map((fav) => fav.id))}
            className="rounded-full bg-blue-500 px-4 py-2 shadow-md">
            <Text className="font-semibold text-white">Select All</Text>
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
        contentContainerStyle={{ paddingBottom: 100 }}
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
    </>
  );
}
