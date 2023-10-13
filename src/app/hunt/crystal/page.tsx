import KeyInput from "@/components/KeyInput"
import { Button } from "@/components/ui/button"
import prisma from '@/lib/prisma'
import { getServerSession } from "next-auth"
import Link from "next/link"

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
                <div className="flex flex-col space-y-4">
                    <span className="text-3xl">This is the gold key</span>
                    <span className="text-4xl text-cyan-500"> clues clues clues </span>
                </div>
                <div className="w-1/2">
                    <KeyInput Key="crystal"/>
                </div>
            </div>
        </div>
    )
}