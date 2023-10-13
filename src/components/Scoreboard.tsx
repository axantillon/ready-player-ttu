'use client'
import { User } from '.prisma/client'
import { FC, useEffect, useState } from 'react'
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

// Initialize the JS client
import { createClient } from '@supabase/supabase-js'
import { KeyboardIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils/cn'
import { calculateScore } from '@/lib/utils/calculateScore'
import { sortTeams } from '@/lib/utils/sortTeams'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!!)

interface ScoreboardProps {
    serverTeams: User[]
}

export type SortedTeams = User & {
    score: number
}

const Scoreboard: FC<ScoreboardProps> = ({ serverTeams }) => {

    const [teams, setTeams] = useState<SortedTeams[]>(sortTeams(serverTeams))

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
                        setTeams(sortTeams(teams.map(team => {
                            if (team.id === (payload.new as any).id) {
                                return payload.new as User
                            }
                            return team
                        })))
                        break;
                }
                console.log(payload)
            }).subscribe()

        return () => {
            supabase.removeChannel(channel)
        }

    }, [teams])

    return (
        <Table className='my-[2vw] text-white'>
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
                        <TableCell className={"font-medium"} id='team-name'>{team.name}</TableCell>
                        <TableCell className='font-medium text-center ' id='group-members'>
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
    )
}

export default Scoreboard;