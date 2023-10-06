'use client';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center space-y-12 p-24">
      <span>hello, <br/> ready player <span className="text-red-500">ttu</span></span>

      <Link href="/hunt">
        <Button> Enter the Hunt </Button>
      </Link>
    </main>
  )
}
