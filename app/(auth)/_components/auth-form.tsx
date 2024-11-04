"use client";

import Link from "next/link";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authSchema, cn, type AuthSchema } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AuthFormProps {
  action: (values: AuthSchema) => Promise<void>;
  title: string;
  description: string;
  btnText: string;
  footerText: string;
  footerLink: string;
}

export const AuthForm = ({
  action,
  title,
  description,
  btnText,
  footerText,
  footerLink,
}: AuthFormProps) => {
  const { toast } = useToast();

  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function handleSubmit(values: AuthSchema) {
    try {
      await action(values);

      if (btnText === "Sign Up") {
        toast({
          title: "Account created",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
      console.log(error);
    } finally {
      form.reset();
    }
  }

  return (
    <section className="w-full h-full max-w-sm flex flex-col p-6 gap-6">
      <div className="space-y-2 mb-2 tracking-wide">
        <h1 className="text-3xl md:text-4xl font-semibold primary_gradient">{title}</h1>
        <p className="text-zinc-300 md:text-md font-medium">{description}</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-10">
          <div className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      type="text"
                      placeholder="you@example.com"
                      className="bg-zinc-950/70"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      type="password"
                      placeholder="••••••••"
                      className="bg-zinc-950/70"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button
              disabled={isLoading}
              type="submit"
              className="btn_gradient tracking-wide flex items-center w-full"
            >
              {isLoading && <Loader className="h-4 w-4 animate-spin mr-2" />}
              {btnText}
            </Button>
          </div>
        </form>
      </Form>
      <p className="text-sm text-zinc-400 tracking-wide font-medium group mt-2">
        {footerText}{" "}
        <Link
          href={btnText === "Sign Up" ? "/sign-in" : "sign-up"}
          className={cn("text-zinc-300 group-hover:underline", isLoading && "pointer-events-none")}
        >
          {footerLink}
        </Link>
      </p>
      <p className="text-xs tracking-wide font-light text-zinc-500 mt-2">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </section>
  );
};
