import { User } from "@prisma/client";

export const calculateScore = (team: User) => {
    const keys = [team.goldKey, team.emeraldKey, team.crystalKey];
    var score = 0;
    keys.forEach((key, index) => {
        if (key) {
            score+=index + 1;
        }
    })

    const scoreTeam = {
        ...team,
        score: score
    }
    return scoreTeam
}