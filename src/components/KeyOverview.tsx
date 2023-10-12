'use client'
import { cn } from "@/lib/utils/cn"
import { DateTime } from "luxon"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"
import Countdown from "./Countdown"
import { Button } from "./ui/button"
import { startTime, endTime } from "@/lib/utils/consts"

interface Keys {
    goldKey: boolean,
    goldKeyTime: string,
    emeraldKey: boolean,
    emeraldKeyTime: string,
    crystalKey: boolean,
    crystalKeyTime: string,
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
    const hackathonEnded = DateTime.now() > endTime

    return (
        <div className={'relative w-full h-full px-8 flex flex-col items-center space-y-8 rounded-md'}>

            {(status === 'unauthenticated' || status === 'loading' || !hackathonStarted || hackathonEnded) && 
                <div className="absolute w-full h-full z-10 flex items-center justify-center bg-black/30 rounded-md">
                    <div className="p-20 rounded-lg bg-white">
                        {status !== 'authenticated' ? 
                            <span>First Log In!</span>
                        :<>
                            {!hackathonStarted && <span>Hackathon starts in: <br/> <Countdown deadline={startTime} /> <br/> The <span className="text-red-500">HUNT</span> is nearly on!</span>}
                            {hackathonEnded && <span>Hackathon already ended!</span>}
                        </>}
                    </div>
                </div>
            }

            <div className="flex items-center justify-between w-full h-20 px-6 border rounded-md">
                <div className="flex flex-col justify-center -space-y-1">
                    <span>Gold Key</span>
                    {keys?.goldKeyTime && <span className="text-sm text-black/50">Acquired on {DateTime.fromISO(keys?.goldKeyTime).toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)}</span>}
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
                <div className="flex flex-col justify-center -space-y-1">
                    <span>Emerald Key</span>
                    {keys?.emeraldKeyTime && <span className="text-sm text-black/50">Acquired on {DateTime.fromISO(keys?.emeraldKeyTime).toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)}</span>}
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
                <div className="flex flex-col justify-center -space-y-1">
                    <span>Crystal Key</span>
                    {keys?.crystalKeyTime && <span className="text-sm text-black/50">Acquired on {DateTime.fromISO(keys?.crystalKeyTime).toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)}</span>}
                </div>
                <div className="">
                    {keys?.crystalKey ?
                        <Button>Got it!</Button>
                    :
                        <Button disabled={!keys?.emeraldKey} onClick={() => router.push('/hunt/crystal')} className={cn('bg-cyan-400 hover:bg-cyan-500', !keys?.emeraldKey && 'cursor-not-allowed')}>Hunt</Button>
                    }
                </div>
            </div>

            {keys?.crystalKey && 
                <div className="flex flex-col items-center justify-center w-full p-10">
                    <span className="text-6xl text-red-500">CONGRATULATIONS! 🎉🎉🎉🎉</span>
                    <span className="text-5xl">You found the Egg... <br/> You are officially Ready... Player <span className="text-red-500">TTU</span></span>
                </div>
            }
        </div>
    )
}

export default KeyOverview;