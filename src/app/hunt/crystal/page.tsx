import KeyInput from "@/components/KeyInput"
import { getServerSession } from "next-auth"
import prisma from '@/lib/prisma'

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
            <div className="">
                <span>You need to login</span>
            </div>
        )
    }

    const emeraldKey = await fetchKey(session?.user?.email!!)

    if (!emeraldKey) {
        return (
            <div className="">
                <span>You need to have the emerald key </span>
            </div>
        )
    }

    return (
        <div className="">
            <KeyInput Key="crystal"/>
        </div>
    )
}