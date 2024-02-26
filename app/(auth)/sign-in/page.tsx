import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import type { AuthSchema } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { AuthForm } from "../_components/auth-form";

export default function SignInPage() {
  const signIn = async (values: AuthSchema) => {
    "use server";

    const { email, password } = values;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/chat");

    return redirect("/chat");
  };

  return (
    <AuthForm
      action={signIn}
      title="Welcome back"
      description="Sign in to your account"
      btnText="Sign In"
      footerText="Don't have an account?"
      footerLink="Sign Up Now"
    />
  );
}
