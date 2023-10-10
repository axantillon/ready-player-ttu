'use client'
import { User } from '.prisma/client'
import { FC, useEffect, useState } from 'react'

// Initialize the JS client
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!!)

interface LeaderboardProps {
    serverTeams: User[]
}

const Leaderboard: FC<LeaderboardProps> = ({ serverTeams }) => {

    const [teams, setTeams] = useState<User[]>(serverTeams)

    useEffect(() => {
        const channel = supabase.channel('leaderboard').on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'User'
            }, payload => {
                const mergedTeams: User[] = teams.includes(payload.new as User) 
                    ? 
                        [...teams, payload.new as User]
                    :   
                        teams.map(team => {
                            if (team.id === (payload.new as any).id) {
                                return payload.new as User
                            }
                            return team
                        })
                    ; 
                setTeams(mergedTeams)
            }).subscribe()

        return () => {
            supabase.removeChannel(channel)
        }

    }, [teams])

    return (
        <pre>
            {JSON.stringify(teams, null, 2)}
        </pre>
    )
}

export default Leaderboard;