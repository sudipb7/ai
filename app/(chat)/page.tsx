import { Chat } from "@/components/chat";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <main className="h-full">
      <Header />
      <Chat />
    </main>
  );
}
