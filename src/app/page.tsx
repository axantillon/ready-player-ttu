import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-10">
      <span className="text-2xl">hello, <br/> ready player <span className="text-red-500">ttu</span></span>

      <span className="w-2/3">During this hackathon you and your team members will compete against all the other <span className="text-red-500">TTU</span> players in a quest to find all three hidden keys</span>

      <ol>
        <ul>The <span className="text-yellow-400">Gold</span> key </ul>
        <ul>The <span className="text-green-400">Emerald</span> key </ul>
        <ul>The <span className="text-cyan-400">Crystal</span> key </ul>
      </ol>

      <Link href="/hunt">
        <Button className="text-xl"> Enter the Hunt </Button>
      </Link>

      <Link href="/leaderboard">
        <Button size={'sm'}> Leaderboard </Button>
      </Link>
    </main>
  )
}
