"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

export async function signInAction(){
    await signIn('google', {redirectTo: "/profile"});
}

export async function signOutAction(){
    await signOut({redirectTo: "/"});
}

export async function addGame(formData) { 
    const session = await auth();
    const gameId = formData.get("gameId");

    if(!session){
      return;
    }

    const { data: existingEntry, error: checkError } = await supabase
        .from("games")
        .select("id")  // select minimal data
        .eq("user_id", session.user.userID)
        .eq("game_id", gameId)
        .maybeSingle(); // returns null if not found

    if (checkError) {
        console.error("Check error:", checkError);
        throw new Error("Failed to check existing game");
    }

    if (existingEntry) {
        console.log("Game already exists for this user. Skipping insert.");
        return;
    }

    // 2. Insert new game if not already added
    const { data, error } = await supabase
        .from("games")
        .insert([
            { user_id: session.user.userID, game_id: gameId },
        ])
        .select();

    if (error) {
        console.error("Insert error:", error);
        throw new Error("Failed to add game");
    }

    revalidatePath("/profile/library");
}

export async function deleteGame(formData){
    const gameId = formData.get("gameId");
    const { data, error } = await supabase
    .from('games')
    .delete()
    .eq('game_id', gameId)

    if(error){
        console.log(error);
        throw new Error("Game could not be removed");
    }
    revalidatePath("/profile/library");
    return data;
}

export async function updateStatus(formData) {
  const gameID = formData.get("gameID");
  const status = formData.get("status");
  const month = formData.get("completedMonth")?.trim();
  const year = formData.get("completedYear")?.trim();
  const notes = formData.get("notes");

  // ✅ Format completed_on cleanly
  let completed_on = "";
  if (year) {
    completed_on = month ? `${month}, ${year}` : `${year}`;
  }

  const session = await auth();
  const userId = session?.user?.userID;

  const { data, error } = await supabase
    .from("games")
    .update({
      status,
      completed_on,
      notes,
    })
    .eq("game_id", gameID)
    .eq("user_id", userId)
    .select();

  if (error) {
    console.error("Supabase update error:", error);
    throw new Error(error.message);
  }

  revalidatePath(`/profile/library/${gameID}`);
  revalidatePath(`/profile/library/edit/${gameID}`);
  redirect(`/profile/library/${gameID}`);
}


export async function updateUser(formData){
  const userData = {
    country: formData.get("country"),
    favourite_genre: formData.get("favourite_genre"),
    platform_preference: formData.get("platform_preference"),
  }
  const email = formData.get("email");

  const { data, error } = await supabase
  .from('users')
  .update(userData)
  .eq('email', email)
  .select();

  if(error){
    console.error(error);
    throw new Error(error);
  }
  revalidatePath("/profile/update")
  redirect("/profile/update")
  return data;
}