import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Player } from '~/types/player.types';
import { getAllPlayers } from '~/api/player.api';

interface FavoritesContextType {
  favorites: Player[];
  addFavorite: (id: string) => void;
  clearFavorites: () => void;
  isFavorite: (id: string) => boolean;
  removeFavoriteItems: (playerId: string[]) => void;
  removeAllFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const showToastDeleteAll = () => {
  Toast.show({
    type: 'info',
    text1: `Clear all Favorite`,
  });
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Player[]>([]);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);

  useEffect(() => {
    async function fetchData() {
      const allPlayers = await getAllPlayers('');
      setAllPlayers(allPlayers);
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    }
    fetchData();
  }, []);

  const isFavorite = (id: string) => {
    return favorites.some((item: Player) => item.id === id);
  };

  const addFavorite = async (playerId: string) => {
    let updatedFavorites = [];
    const existingPlayer = allPlayers?.find((item) => item.id === playerId);
    if (!existingPlayer) {
      return;
    }
    const isFavorite = favorites.some((item) => item.id === existingPlayer.id);
    if (isFavorite) {
      updatedFavorites = favorites.filter((item) => item.id !== playerId);
    } else {
      updatedFavorites = [...favorites, existingPlayer];
    }
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFavoriteItems = async (playerId: string[]) => {
    const updatedFavorites = favorites.filter((item: Player) => !playerId.includes(item.id));
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeAllFavorites = async () => {
    try {
      setFavorites([]);
      await AsyncStorage.removeItem('favorites');
      showToastDeleteAll();
    } catch (error) {
      console.error('Failed to clear favorites', error);
    }
  };

  const clearFavorites = async () => {
    try {
      setFavorites([]);
      await AsyncStorage.removeItem('favorites');
      showToastDeleteAll();
    } catch (error) {
      console.error('Failed to clear favorites', error);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        isFavorite,
        favorites,
        addFavorite,
        clearFavorites,
        removeFavoriteItems,
        removeAllFavorites,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
};
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
