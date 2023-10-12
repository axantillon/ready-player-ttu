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
                switch (payload.eventType) {
                    case 'INSERT':
                        setTeams([...teams, payload.new as User])
                        break;
                    case 'UPDATE':
                        setTeams(teams.map(team => {
                            if (team.id === (payload.new as any).id) {
                                return payload.new as User
                            }
                            return team
                        }))
                        break;
                }
                console.log(payload)
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