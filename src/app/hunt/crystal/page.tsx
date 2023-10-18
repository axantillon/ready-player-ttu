import KeyInput from "@/components/KeyInput"
import { Button } from "@/components/ui/button"
import prisma from '@/lib/prisma'
import { KeyIcon } from "lucide-react"
import { getServerSession } from "next-auth"
import Link from "next/link"

const runes = [
    <span key='1'>A <span className="text-cyan-500">weekly</span> gathering space, filled with the <span className="text-cyan-500">tools</span> of our trade, within those walls you will find a <span className="text-cyan-500">third</span> of me. </span>,
    <span key='2'>Turning tin into gold, brewing and exploring <span className="text-cyan-500">potions</span> upon which our tools are fundamentally built, in our grounds but <span className="text-cyan-500">one man</span> could be known as the <span className="text-cyan-500"> Alchemist</span>, it is said he favors one digit above all.</span>,
    <span key='3'>At the <span className="text-cyan-500">bowels</span> of our fortress, magic materializes, it <span className="text-cyan-500">melts</span>, it <span className="text-cyan-500">forms</span>, it <span className="text-cyan-500">hardens</span>. Long ago, I was forged in these fires, now only part of me spans in these ruins.</span>
]

const fetchKey = async (leaderEmail: string) => {
    try {
        const key = await prisma.user.findFirst({
            where: {
                email: leaderEmail
            },
            select: {
                emeraldKey: true,
            }
        })
        return key?.emeraldKey
    } catch (e) {
        return null
    }
}

export default async function CrystalKey() {

    const session = await getServerSession()

    const randomRunes = runes.map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);

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

    const emeraldKey = await fetchKey(session?.user?.email!!)

    if (!emeraldKey) {
        return (
            <div className="w-full h-44 flex items-center justify-center space-y-4">
                <Link href={'/hunt'}>
                    <Button variant={'ghost'}>{'<-- Go Back'}</Button>
                </Link>
                <span>You need to have the emerald key </span>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-screen px-10 space-y-10">
            <Link href={'/hunt'}>
                <Button variant={'ghost'}>{'<-- Go Back'}</Button>
            </Link>
            <div className="w-full flex flex-col items-center justify-center space-y-10">
                <div className="flex flex-col max-w-[60vw] space-y-8 text-center">
                    <span className="flex items-center text-2xl justify-center">Welcome to the <span className="text-red-500 mx-3"> hunt </span> for the <KeyIcon className="mx-4 w-10 h-10 text-cyan-500"/>!</span>
                    <div className='flex flex-col'>
                        <span>I am composed of <span className="text-cyan-500">three digits</span> and reside lost among our grounds.</span>
                        <span><span className="text-cyan-500">Tales</span> have been told in markings on the wall around which way round I go.</span>
                    </div>
                </div>
                <div className="w-1/2">
                    <KeyInput Key="crystal"/>
                </div>

                <div className="flex flex-col text-center">
                    <span>Only one has ever <span className="text-cyan-500">forced</span> themselves through to avoid following breadcrumbs. Seek <span className="text-cyan-500">creators</span> if you desire the same.</span>
                    <span>Else, follow these runes: </span>
                </div>

                <div className="flex w-[90vw] text-sm">
                    <div className="w-1/3 px-4">
                        {randomRunes[0]}
                    </div>
                    <div className="w-1/3 px-4">
                        {randomRunes[1]}
                    </div>
                    <div className="w-1/3 px-4">
                        {randomRunes[2]}
                    </div>
                </div>
            </div>
        </div>
    )
}