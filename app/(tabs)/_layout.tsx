import { router, Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFavorites } from '~/context/favorite.context';
import { TabBarIcon } from '../../components/TabBarIcon';

export default function TabLayout() {
  const { favorites } = useFavorites();

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'black' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: 'Favorite',
          tabBarIcon: ({ color }) => (
            <View style={{ position: 'relative' }}>
              <Feather name="heart" size={24} color={color} />
              {favorites.length > 0 && (
                <View className="absolute right-0 top-0 h-4 w-4 items-center justify-center rounded-full bg-red-500">
                  <Text className="text-xs text-white">{favorites.length}</Text>
                </View>
              )}
            </View>
          ),
          headerShown: true,
          headerTitle: 'Favorites',
          headerLeft: () => (
            <Feather name="arrow-left" size={24} color="black" onPress={() => router.back()} />
          ),
        }}
      />
      <Tabs.Screen
        name="captain"
        options={{
          title: 'Captain',
          headerShown: true,
          headerTitle: 'Captain',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
