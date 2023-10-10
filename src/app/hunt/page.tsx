import KeyOverview from "@/components/KeyOverview";
import UserCard from "@/components/UserCard";


export default function Hunt() {


    return (
        <div className="w-full h-full px-12 flex">
            <div className="">
                <UserCard />
            </div>
            <div className="flex-1 h-full pl-12 pb-24">
                <KeyOverview />
            </div>
        </div>
    )
}