'use client'
import { useSession } from 'next-auth/react'
import { FC, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

interface KeyOverviewProps {

}

interface Keys {
    goldKey: boolean,
    emeraldKey: boolean,
    crystalKey: boolean,
}

const KeyOverview: FC<KeyOverviewProps> = ({  }) => {

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

    if (status === 'unauthenticated' || status === 'loading') return (
        <div className={'w-full h-full p-8 bg-black/25 rounded-md'}>
            <span>First Log In!</span>
        </div>
    )

    if (keys === null) return (
        <div className={'w-full h-full p-8 bg-black/25 rounded-md'}>
            <span>Loading...</span>
        </div>
    )

    return (
        <div className={'w-full h-full p-8 flex flex-col space-y-8 rounded-md'}>

            <div className="flex items-center justify-between w-full h-20 px-6 border rounded-md">
                <div className="">
                    <span>Gold Key</span>
                </div>
                <div className="">
                    {keys?.goldKey ?
                        <Button>Got it!</Button>
                    :
                        <Button onClick={() => router.push('/hunt/gold')} className='bg-green-500 hover:bg-green-600'>Hunt</Button>
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
                        <Button disabled={!keys?.goldKey} onClick={() => router.push('/hunt/emerald')} className='bg-green-500 hover:bg-green-600'>Hunt</Button>
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
                        <Button disabled={!keys?.emeraldKey} onClick={() => router.push('/hunt/crystal')} className='bg-green-500 hover:bg-green-600'>Hunt</Button>
                    }
                </div>
            </div>

        </div>
    )
}

export default KeyOverview;