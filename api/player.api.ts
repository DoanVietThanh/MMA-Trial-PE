import { Player } from '~/types/player.types';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const getAllPlayers = async (teamSearch: string): Promise<Player[]> => {
  console.log(`${apiUrl}?team=${teamSearch}`);
  const response = await fetch(`${apiUrl}?team=${teamSearch}`);
  const players = await response.json();
  return players;
};

export const getAllTeams = async (): Promise<string[]> => {
  const response = await fetch(`${apiUrl}`);
  const players = (await response.json()) as Player[];
  const teams = [...new Set(players.map((player) => player.team))];
  return teams;
};
