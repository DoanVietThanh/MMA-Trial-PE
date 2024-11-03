import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllPlayers } from '~/api/player.api';
import CardItem from '~/components/ui/card-item';

import TeamFilter from '~/components/ui/team-filter';
import UserControl from '~/components/ui/user-control';
import { Player } from '~/types/player.types';

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const { teamSearch = '' } = useLocalSearchParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const resPlayers = await getAllPlayers(teamSearch as string);
        setPlayers(resPlayers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [teamSearch]);

  console.log({ players });

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <View className="px-4">
        <UserControl />

        <TeamFilter />

        <View className="mt-6 h-[76vh]">
          <FlatList
            data={players}
            keyExtractor={(item) => item.id as string}
            renderItem={({ item }) => <CardItem player={item} />}
            ListFooterComponent={<View className="h-2" />}
            ListHeaderComponent={
              <View>
                <Text className="text-lg font-semibold text-gray-500">
                  {players.length} players found
                </Text>
              </View>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
