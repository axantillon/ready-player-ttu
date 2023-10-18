import KeyInput from '@/components/KeyInput'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import { HistoryIcon, KeyIcon } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

const fetchKey = async (leaderEmail: string) => {
    try {
        const key = await prisma.user.findFirst({
            where: {
                email: leaderEmail
            },
            select: {
                goldKey: true,
            }
        })
        return key?.goldKey
    } catch (e) {
        return null
    }
}

export default async function EmeraldKey() {

    const session = await getServerSession()

    if (!session?.user) {
        return (
            <div className="w-full h-44 flex items-center justify-center space-y-4">
                <Link href={'/hunt'}>
                    <Button variant={'ghost'}>{'<-- Go Back'}</Button>
                </Link>
                <span>You need to login</span>
            </div>
        )
    }

    const goldKey = await fetchKey(session?.user?.email!!)

    if (!goldKey) {
        return (
            <div className="w-full h-44 flex items-center justify-center space-y-4">
                <Link href={'/hunt'}>
                    <Button variant={'ghost'}>{'<-- Go Back'}</Button>
                </Link>
                <span>You need to have the gold key </span>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-screen px-10 space-y-10">
            <Link href={'/hunt'}>
                <Button variant={'ghost'}>{'<-- Go Back'}</Button>
            </Link>
            <div className="w-full flex flex-col items-center justify-center space-y-10">
                <div className="flex flex-col space-y-10">
                    <span className="flex items-center text-2xl">Welcome to the <span className="text-red-500">hunt</span> for the <KeyIcon className="mx-4 w-10 h-10 text-green-500"/>!</span>
                    <div className='flex flex-col'>
                        <span>Sometimes, all it takes is following <Link href={'https://github.com/ttu-cr-stl/ready-player-ttu'} className="text-green-500">links.</Link></span> 
                        <span>Perhaps, further back in <span className="text-green-500">history</span>. </span>
                        <div className='flex items-center space-x-4'>
                            <span>Rewind </span>
                            <HistoryIcon className='text-green-500' />
                        </div> 
                        <span>Find the <span className="text-green-500">changes</span> the creators have made.</span>
                        <span>Maybe, remember Alice and follow the <span className="text-green-500">cat.</span></span>
                    </div>
                </div>
                <div className="w-1/2">
                    <KeyInput Key="emerald"/>
                </div>
            </div>
        </div>
    )
}




