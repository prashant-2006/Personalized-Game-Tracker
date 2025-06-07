import { auth } from "./auth";
import { supabase } from "./supabase";

export async function getUser(email){
   let { data, error } = await supabase
  .from('users')
  .select('id')
  .eq('email', email)
  .limit(1);

    if (error) {
        console.error(error);
        throw new Error('Error fetching user');
    }
    return data?.[0] || null;
}

export async function createUser({ email, name, image }) {
  const { data, error } = await supabase
    .from('users')
    .insert([
      { email, name, image }
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Error creating user');
  }

  return data;
}

export async function getGames() {
  const session = await auth();
  const userId = session?.user?.userID;

  if (!userId) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("games")
    .select("game_id")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching games:", error);
    throw new Error("Could not fetch games");
  }

  return data.map((item) => item.game_id);
}

export default async function getGameData(gameID) {
  const session = await auth();
  const userId = session?.user?.userID;

  const { data: games, error } = await supabase
    .from('games')
    .select('*')
    .eq('game_id', gameID)
    .eq('user_id', userId);

  if (error) {
    console.error(error);
    throw new Error(error);
  }

  return games;
}

export async function getUserData(email){
   let { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('email', email)

    if (error) {
        console.error(error);
        throw new Error('Error fetching user');
    }
    return data || null;
}

export async function getGamesData() {
  const session = await auth();
  const userId = session?.user?.userID;

  if (!userId) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching games:", error);
    throw new Error("Could not fetch games");
  }

  return data;
}