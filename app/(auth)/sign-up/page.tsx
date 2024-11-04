import { headers } from "next/headers";

import type { AuthSchema } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { AuthForm } from "../_components/auth-form";

export default function SignUpPage() {
  const signUp = async (values: AuthSchema) => {
    "use server";

    const origin = headers().get("origin");
    const { email, password } = values;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return;
  };

  return (
    <AuthForm
      action={signUp}
      title="Get Started"
      description="Create a new account"
      btnText="Sign Up"
      footerText="Have an account?"
      footerLink="Sign In Now"
    />
  );
}
