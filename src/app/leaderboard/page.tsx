import Link from "next/link";
import { Button } from "@/components/ui/button";

import Leaderboard from "@/components/Leaderboard";
import prisma from "@/lib/prisma";

const fetchLeaderboard = async () => {
    const teams = await prisma.user.findMany()
    return teams
}

export default async function LeaderboardPage() {

    const teams = await fetchLeaderboard()

    return (
        <div className="w-screen h-full py-10 flex flex-col items-center justify-center">
            <Link href="../" className="my-[2vh]">
                <Button className="text-xl"> Go back </Button>
            </Link>
            <div className="w-3/4 p-12 bg-black rounded-xl">
                <Leaderboard serverTeams={teams} />
            </div>
        </div>
    )
}