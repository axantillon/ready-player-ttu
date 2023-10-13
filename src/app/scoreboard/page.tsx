import Scoreboard from "@/components/Scoreboard";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import ScoreboardCountdown from "./ScoreboardCountdown";

export const dynamic = "force-dynamic";

const fetchLeaderboard = async () => {
    const teams = await prisma.user.findMany()
    return teams
}

export default async function LeaderboardPage() {

    const teams = await fetchLeaderboard()

    return (
        <div className="w-screen min-h-screen flex flex-col py-4 px-2">
            <Link href={'/'}>
                <Button variant={'ghost'}>{'<-- Go Back'}</Button>
            </Link>
            <div className="flex flex-col items-center space-y-8">
                <Link href={'/'}>
                    <span className="text-2xl">hello, <br/> ready player <span className="text-red-500">ttu</span></span>
                </Link>
                <ScoreboardCountdown />
                <div className="w-5/6 p-6 bg-black rounded-xl">
                    <Scoreboard serverTeams={teams} />
                S</div>
            </div>
        </div>
    )
}