import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { getAllTeams } from '~/api/player.api';

const TeamFilter = () => {
  const [allTeams, setAllTeams] = useState<string[]>([]);
  const { teamSearch = '' } = useLocalSearchParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const resTeams = await getAllTeams();
        setAllTeams(['All', ...resTeams]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handleSelectTeam = (team: string) => {
    if (team === 'All') {
      router.setParams({ teamSearch: '' });
    } else {
      router.setParams({ teamSearch: team });
    }
  };

  const isActive = (team: string) => {
    return teamSearch === team || (team === 'All' && teamSearch === '');
  };

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}>
        {allTeams.map((team: string) => (
          <TouchableOpacity
            key={team}
            onPress={() => handleSelectTeam(team)}
            className={`mr-4 mt-2 rounded-lg border px-4 py-2 ${
              isActive(team) ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
            }`}>
            <Text className={`${isActive(team) ? 'text-blue-500' : 'text-black'}`}>{team}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TeamFilter;
