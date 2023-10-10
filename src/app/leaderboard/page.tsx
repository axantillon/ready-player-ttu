import Leaderboard from "@/components/Leaderboard";
import prisma from "@/lib/prisma";

const fetchLeaderboard = async () => {
    const teams = await prisma.user.findMany()
    return teams
}

export default async function LeaderboardPage() {

    const teams = await fetchLeaderboard()

    return (
        <div className="">
            <Leaderboard serverTeams={teams} />
        </div>
    )
}