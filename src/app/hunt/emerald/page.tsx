import KeyInput from '@/components/KeyInput'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'

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
            <div className="">
                <span>You need to login</span>
            </div>
        )
    }

    const goldKey = await fetchKey(session?.user?.email!!)

    if (!goldKey) {
        return (
            <div className="">
                <span>You need to have the gold key </span>
            </div>
        )
    }

    return (
        <div className="">
            <KeyInput Key="emerald"/>
        </div>
    )
}