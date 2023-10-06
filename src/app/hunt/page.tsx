'use client'
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";


export default function Hunt() {

    const { data: session } = useSession()

    console.log(session)

    return (
        <div className="w-full h-full flex items-center justify-center py-28">
            <Button onClick={() => {signIn("google")}}>Log In</Button>
        </div>
    )
}