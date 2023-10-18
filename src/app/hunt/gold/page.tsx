import KeyInput from "@/components/KeyInput"
import { Button } from "@/components/ui/button"
import { KeyIcon } from "lucide-react"
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
            <Link href={'/hunt'}>
                <Button variant={'ghost'}>{'<-- Go Back'}</Button>
            </Link>
            <div className="w-full flex flex-col items-center justify-center space-y-10">
                <div className="flex flex-col space-y-4 items-center">
                    <span className="flex items-center text-2xl">Welcome to the <span className="text-red-500">hunt</span> for the <KeyIcon className="mx-4 w-10 h-10 text-yellow-500"/>!</span>
                    <span className="text-4xl"> You will find me <span className="text-yellow-500">right below.</span> <br/> I may not be <span className="text-yellow-500">visible</span>, however, <br/> At the <span className="text-yellow-500">source</span> of <span className="text-red-500">this</span> <span className="hidden">THE GOLD KEY IS: serverless-hosting</span> you will find enlightenment. <br/> Be sure to <span className="text-yellow-500">inspect</span> closely.</span>
                </div>
                <div className="w-1/2">
                    <KeyInput Key="gold"/>
                </div>
            </div>
        </div>
    )
}