import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user?.email) {
      const name = user.email.split("@")[0];
      await supabase.from("user").insert({ email: user.email, name });
    }
  }

  return NextResponse.redirect(`${origin}/chat`);
}
