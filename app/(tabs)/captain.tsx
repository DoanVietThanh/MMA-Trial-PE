import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { getAllCaptains } from '~/api/player.api';
import CardItem from '~/components/ui/card-item';
import { useFavorites } from '~/context/favorite.context';
import { Player } from '~/types/player.types';

export default function CaptainScreen() {
  const { removeFavoriteItems, isFavorite } = useFavorites();

  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [numLikedCaptains, setNumLikedCaptains] = useState(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // State to track sort order

  useEffect(() => {
    async function fetchData() {
      try {
        const resPlayers = await getAllCaptains();
        setPlayers(resPlayers);

        // Initial calculation of liked captains
        const likedCaptains = resPlayers.filter((player) => isFavorite(player.id));
        setNumLikedCaptains(likedCaptains.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Recalculate liked captains whenever selectedItems or favorites change
    const likedCaptains = players.filter((player) => isFavorite(player.id));
    setNumLikedCaptains(likedCaptains.length);
  }, [selectedItems, players, isFavorite]);

  const handleSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleRemove = () => {
    if (selectedItems.length > 0) {
      Alert.alert('Confirm Removal', `Are you sure you want to remove favorite item(s)?`, [
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
      ]);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    setPlayers((prevPlayers) =>
      [...prevPlayers].sort((a, b) =>
        sortOrder === 'asc' ? a.minutesPlayed - b.minutesPlayed : b.minutesPlayed - a.minutesPlayed
      )
    );
  };

  return (
    <>
      <View className="flex justify-between p-4">
        <TouchableOpacity
          onPress={toggleSortOrder}
          className="w-fit rounded-full bg-gray-500 px-4 py-2 shadow-md">
          <Text className="font-semibold text-white">
            Sort by Minutes Played ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-between p-4">
          {numLikedCaptains > 1 && (
            <TouchableOpacity
              onPress={() => setSelectedItems(players.map((player: Player) => player.id))}
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
              <Text className="ml-2 font-semibold text-red-500">Remove favorite</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <FlatList
        data={players}
        keyExtractor={(tool) => tool.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }: { item: Player }) => {
          return (
            <CardItem
              player={item}
              isShownCheckbox={isFavorite(item.id)}
              onSelect={handleSelect}
              selected={selectedItems.includes(item.id)}
            />
          );
        }}
      />
    </>
  );
}
