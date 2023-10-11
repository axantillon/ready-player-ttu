'use client'
import { DateTime } from "luxon"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils/cn"


const startTime = DateTime.fromISO(process.env.NEXT_PUBLIC_HACKATHON_START || '')
const endTime = DateTime.fromISO(process.env.NEXT_PUBLIC_HACKATHON_END || '')

interface Keys {
    goldKey: boolean,
    emeraldKey: boolean,
    crystalKey: boolean,
}

const KeyOverview: FC = ({}) => {

    const { status } = useSession()
    const [keys, setKeys] = useState<Keys | null>(null)
    const router = useRouter()

    useEffect(() => {
        const fetchKeys = async () => {
            const keys = await fetch('/api/keys')
            setKeys(await keys.json())
        }
        if (status === 'authenticated' && keys === null) {
            fetchKeys()
        }
    }, [keys, status])

    const hackathonStarted = DateTime.now() > startTime
    const hackathonUntilStart = DateTime.now().diff(startTime, 'hours')
    const hackathonEnded = DateTime.now() > endTime
    const hackathonUntilEnd = DateTime.now().diff(endTime, 'hours')

    return (
        <div className={'relative w-full h-full px-8 flex flex-col items-center space-y-8 rounded-md'}>

            {(status === 'unauthenticated' || status === 'loading' || !hackathonStarted || hackathonEnded) && 
                <div className="absolute w-full h-full z-10 flex items-center justify-center bg-black/30 rounded-md">
                    <div className="p-20 rounded-lg bg-white">
                        {status !== 'authenticated' ? 
                            <span>First Log In!</span>
                        :<>
                            {!hackathonStarted && <span>Hackathon starts in {hackathonUntilStart.hours} hours</span>}
                            {hackathonEnded && <span>Hackathon ended {hackathonUntilEnd.hours} hours ago</span>}
                        </>}
                    </div>
                </div>
            }

            <div className="flex items-center justify-between w-full h-20 px-6 border rounded-md">
                <div className="">
                    <span>Gold Key</span>
                </div>
                <div className="">
                    {keys?.goldKey ?
                        <Button>Got it!</Button>
                    :
                        <Button onClick={() => router.push('/hunt/gold')} className='bg-yellow-400 hover:bg-yellow-500'>Hunt</Button>
                    }
                </div>
            </div>

            <div className="flex items-center justify-between w-full h-20 px-6 border rounded-md">
                <div className="">
                    <span>Emerald Key</span>
                </div>
                <div className="">
                    {keys?.emeraldKey ?
                        <Button>Got it!</Button>
                    :
                        <Button disabled={!keys?.goldKey} onClick={() => router.push('/hunt/emerald')} className={cn('bg-green-400 hover:bg-green-500', !keys?.goldKey && 'cursor-not-allowed')}>Hunt</Button>
                    }   
                </div>
            </div>

            <div className="flex items-center justify-between w-full h-20 px-6 border rounded-md">
                <div className="">
                    <span>Crystal Key</span>
                </div>
                <div className="">
                    {keys?.crystalKey ?
                        <Button>Got it!</Button>
                    :
                        <Button disabled={!keys?.emeraldKey} onClick={() => router.push('/hunt/crystal')} className={cn('bg-cyan-400 hover:bg-cyan-500', !keys?.emeraldKey && 'cursor-not-allowed')}>Hunt</Button>
                    }
                </div>
            </div>

        </div>
    )
}

export default KeyOverview;