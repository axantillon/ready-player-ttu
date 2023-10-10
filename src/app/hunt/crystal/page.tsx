import KeyInput from "@/components/KeyInput"
import { getServerSession } from "next-auth"

export default async function CrystalKey() {

    const session = await getServerSession()

    if (!session?.user) {
        return (
            <div className=""></div>
        )
    }

    return (
        <div className="">
            <KeyInput Key="crystal"/>
        </div>
    )
}