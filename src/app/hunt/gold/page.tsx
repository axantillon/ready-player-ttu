import KeyInput from "@/components/KeyInput"
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth"
import Link from "next/link"

export default async function GoldKey() {

    const session = await getServerSession()

    if (!session?.user) {
        return (
            <div className="w-full h-44 flex flex-col items-center justify-center space-y-4">
                <span>You need to login</span>
                <Link href={'/hunt'}>
                    <Button variant={'ghost'}>{'<-- Go Back'}</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-screen px-10 space-y-10">
            <span className="hidden">THE KEY IS HFJDHF</span>
            <Link href={'/hunt'}>
                <Button variant={'ghost'}>{'<-- Go Back'}</Button>
            </Link>
            <div className="w-full flex flex-col items-center justify-center space-y-10">
                <div className="flex flex-col space-y-4">
                    <span className="text-3xl">This is the gold key</span>
                    <span className="text-4xl text-yellow-500"> clues clues clues </span>
                </div>
                <div className="w-1/2">
                    <KeyInput Key="gold"/>
                </div>
            </div>
        </div>
    )
}