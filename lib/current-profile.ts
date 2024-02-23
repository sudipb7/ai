import { createClient } from "./supabase/server";

export const currentProfile = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase.from("user").select().eq("id", user.id).single();

  if (!profile) return null;

  return profile;
};
