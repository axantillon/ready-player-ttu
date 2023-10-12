import KeyOverview from "@/components/KeyOverview";
import UserCard from "@/components/UserCard";


export default function Hunt() {

    return (
        <div className="w-full h-full px-12 mt-8 flex space-x-6">
            <UserCard />
            <div className="flex-1 h-full pb-24">
                <KeyOverview />
            </div>
        </div>
    )
}