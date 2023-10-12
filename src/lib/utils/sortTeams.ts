import { User } from "@prisma/client";
import { calculateScore } from "./calculateScore";
import { SortedTeams } from "@/components/Leaderboard";

export const sortTeams = (teams: User[]) => {

    const teamsScore = teams.map((team) => calculateScore(team))
    const sortedTeams = teamsScore.sort((a,b) => b.score - a.score)

    return sortedTeams
}