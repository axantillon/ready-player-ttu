'use client'
import { cn } from "@/lib/utils/cn"
import { isHackathonOver, isHackathonStarted, startTime } from "@/lib/utils/consts"
import { DateTime } from "luxon"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"
import Countdown from "./Countdown"
import { Button } from "./ui/button"
import Image from 'next/image'
import GoldenEgg from '@/lib/assets/goldEgg.png'

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

    return (
        <div className={'relative w-full h-full px-8 flex flex-col items-center space-y-8 rounded-md'}>

            {(status === 'unauthenticated' || status === 'loading' || !isHackathonStarted || isHackathonOver) && 
                <div className="absolute w-full h-full z-10 flex items-center justify-center bg-black/30 rounded-md">
                    <div className="p-20 rounded-lg bg-white">
                        {status !== 'authenticated' ? 
                            <span>First Log In!</span>
                        :<>
                            {!isHackathonStarted && <span>Hackathon starts in: <br/> <Countdown deadline={startTime} /> <br/> The <span className="text-red-500">HUNT</span> is nearly on!</span>}
                            {isHackathonOver && <span>Hackathon already ended!</span>}
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
                <div className="flex w-full space-x-4">
                    <div className="flex flex-col w-2/3 space-y-6">
                        <span className="text-lg text-red-500">CONGRATULATIONS! 🎉🎉🎉🎉</span>
                        <span>You found the Egg... <br/> You are officially Ready... Player <span className="text-red-500">TTU</span></span>
                        <div className="relative w-24 h-24 aspect-square mx-auto">
                            <Image src={GoldenEgg} alt='' fill />
                        </div>
                    </div>
                    <div className="text-sm">
                        <span>You acquired the <span className='text-yellow-400'>Gold</span> Key in <Countdown deadline={DateTime.fromISO(keys?.goldKeyTime!! as unknown as string)} from={startTime} update={false} /> </span>
                        <br/>
                        <span>You acquired the <span className='text-green-400'>Emerald</span> Key in <Countdown deadline={DateTime.fromISO(keys?.emeraldKeyTime!! as unknown as string)} from={startTime} update={false} /> </span>
                        <br/>
                        <span>You acquired the <span className='text-cyan-400'>Crystal</span> Key in <Countdown deadline={DateTime.fromISO(keys?.crystalKeyTime!! as unknown as string)} from={startTime} update={false} /> </span>
                    </div>
                </div>
            }
        </div>
    )
}

export default KeyOverview;