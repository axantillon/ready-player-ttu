'use client'
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";


export default function Hunt() {

    return (
        <div className="w-full h-full flex items-center justify-center py-28">
            <Button onClick={() => {signIn("google")}}>Log In</Button>
        </div>
    )
}