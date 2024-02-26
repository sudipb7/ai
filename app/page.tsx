import Link from "next/link";
import Image from "next/image";
import { Github, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config/site-config";
import { currentProfile } from "@/lib/current-profile";
import { Button } from "@/components/ui/button";
import { CardSpotlight } from "@/components/ui/card-spotlight";

export default async function HomePage() {
  const profile = await currentProfile();

  return (
    <main className="min-h-[calc(100dvh-4rem)] animate_in">
      <section className="animate_in flex flex-col items-center justify-center p-4 py-24">
        <span className="relative group inline-block w-fit mx-auto overflow-hidden rounded-full p-[1px]">
          <span
            className={cn(
              "absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#71717a_0%,#27272a_50%,#71717a_100%)]",
              "animate-spin duration-700 rounded-full group-hover:animate-none",
            )}
          />
          <div
            className={cn(
              "flex gap-1 h-full group w-full items-center justify-center rounded-full bg-zinc-900 px-3 py-1 text-xs text-zinc-200 backdrop-blur-3xl",
              "hover:backdrop-blur-2xl hover:shadow-lg transition-all duration-200 ease-in-out",
            )}
          >
            <Sparkles className="mr-1 h-3 w-3" />
            <p>Discover true essence of AI</p>
          </div>
        </span>
        <h1 className="primary_gradient my-3 text-4xl md:text-5xl lg:text-6xl md:leading-[3.8rem] lg:leading-[4.8rem] text-center font-semibold tracking-wide">
          AI-Driven Chat, Reimagined
        </h1>
        <p className="md:text-lg primary_gradient tracking-wide max-w-3xl text-center">
          Experience seamless, intelligent conversations with Gemini Pro&apos;s cutting-edge
          language model.
        </p>
        <div className="w-full flex items-center justify-center gap-4 mt-6">
          <Button className="btn_gradient" asChild>
            <Link href={profile ? "/chat" : "/sign-in"}>Get Started</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link
              className="flex items-center"
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Link>
          </Button>
        </div>
      </section>
      <section className="animate_in w-full">
        <CardSpotlight className="mx-auto w-fit max-w-[85%] p-0" hoverEffect>
          <Image
            src="/ss.png"
            alt="Chat Page"
            loading="lazy"
            quality={100}
            width={1000}
            height={500}
          />
        </CardSpotlight>
      </section>
      <footer className="animate_in text-sm w-full p-4 mt-4 text-zinc-300 text-center">
        Built by{" "}
        <Link
          href={siteConfig.links.twitter}
          target="_blank"
          rel="noreferrer noopener"
          className="underline text-white"
        >
          Sudip Biswas.
        </Link>{" "}
        The source code is available on{" "}
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer noopener"
          className="underline text-white"
        >
          GitHub.
        </Link>
      </footer>
    </main>
  );
}
