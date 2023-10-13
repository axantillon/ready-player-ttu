'use client'
import { User } from '.prisma/client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { KeyIcon } from 'lucide-react'
import { FC, useEffect, useState } from 'react'

// Initialize the JS client
import { cn } from '@/lib/utils/cn'
import { isHackathonOver, isHackathonStarted } from '@/lib/utils/consts'
import { sortTeams } from '@/lib/utils/sortTeams'
import { createClient } from '@supabase/supabase-js'
import WinnerAlert from './WinnerAlert'
import { calculateScore } from '@/lib/utils/calculateScore'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!!)

interface ScoreboardProps {
    serverTeams: User[]
}

export type SortedTeams = User & {
    score: number
}

const Scoreboard: FC<ScoreboardProps> = ({ serverTeams }) => {

    const [teams, setTeams] = useState<SortedTeams[]>(sortTeams(serverTeams))
    const [latestWinner, setLatestWinner] = useState<User>()
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        const channel = supabase.channel('leaderboard').on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'User'
            }, payload => {
                switch (payload.eventType) {
                    case 'INSERT':
                        setTeams(sortTeams([...teams, payload.new as User]))
                        break;
                    case 'UPDATE':
                        if (calculateScore(payload.new as User).score === 6) {
                            setOpen(true)
                            setLatestWinner(payload.new as User)
                        }
                        setTeams(sortTeams(teams.map(team => {
                            if (team.id === (payload.new as any).id) {
                                return payload.new as User
                            }
                            return team
                        })))
                        break;
                }
            }).subscribe()

        return () => {
            supabase.removeChannel(channel)
        }

    }, [teams])

    return (<>{
        isHackathonStarted ? <>
            <WinnerAlert open={open} setOpen={setOpen} winner={latestWinner} />
            <Table className='text-white text-lg'>
                <TableCaption>Ready Player TTU Leaderboard</TableCaption>
                <TableHeader>
                    <TableRow >
                        <TableHead className='font-medium text-green-500'> Rank </TableHead>
                        <TableHead className="font-medium text-green-500">Team name</TableHead>
                        <TableHead className="font-medium text-center text-green-500">Group members</TableHead>
                        <TableHead className="font-medium text-center text-green-500">Keys</TableHead>
                        <TableHead className="font-medium text-center text-green-500">Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {teams.map((team, index) => (
                        <TableRow className={cn("text-red-600", index === 0 && 'text-amber-300', index === 1 && 'text-orange-400', index > 4 && 'text-sky-400')} key={index}>
                            <TableCell className='font-medium' id='rank'> {index+1} </TableCell>
                            <TableCell className={"font-medium"} id='team-name'>{team.score === 6 && '👑 '}{team.groupName}</TableCell>
                            <TableCell className='font-medium text-center ' id='group-members'>
                                <div className="inline-flex mx-[1vw]">{team.name}</div>
                                {team.groupMembers !== null && team.groupMembers.map((member, count) => (
                                    <div key = {count} className='inline-flex mx-[1vw]'>{member} </div>
                                ))}
                            </TableCell>
                            <TableCell className='flex space-x-2 justify-center' id='keys'>
                                <KeyIcon color={team.goldKey ? '#FBBF24':'#404040'}/>
                                <KeyIcon color={team.emeraldKey ? '#4ADE80':'#404040'}/>
                                <KeyIcon color={team.crystalKey ? '#22D3EE':'#404040'}/>
                            </TableCell>
                            <TableCell className="font-medium text-center" id='score'>
                                {team.score}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>:
            <div className="w-full h-full flex items-center justify-center pt-8 text-white">
                <span>Gather your team of <span className='text-red-500'>Gunters</span> and prepare!</span>
            </div>
    }</>)
}

export default Scoreboard;