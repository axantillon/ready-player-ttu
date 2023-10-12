'use client'
import { cn } from '@/lib/utils/cn';
import { signIn, signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { TeamMembers } from './TeamMembers';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

interface UserCardProps {
  compact?: boolean;
}

const UserCard: FC<UserCardProps> = ({ compact = false }) => {

    const { data: session, status } = useSession()
    const path = usePathname()

    if (!compact && status === 'loading') return (
        <Button className='w-96'>Loading</Button>
    )

    if (compact && status === 'loading') return <></>

    if (compact && path === '/hunt') return <></>

    return (
        <div className="flex flex-col items-start justify-start">
            {status === 'authenticated' ? <>
                <span>Team Leader:</span>
                <div className='flex flex-col space-y-4'>
                    <div className={'w-96 p-2 flex items-center space-x-4 border rounded-md'}>
                        <Avatar>
                            <AvatarImage src={session?.user?.image!!} />
                            <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className='flex-1'>{session?.user?.name}</span>
                        {!compact && <Button onClick={() => signOut()} className='text-red-500' variant={'outline'}>Log Out</Button>}
                    </div>
                    {!compact && <>
                        <TeamMembers leaderEmail={session?.user?.email!!} />
                        <span className='w-96 text-start pt-6'>Be sure to add all your team members before the hackahton ends!</span>
                    </>}
                </div>
            </>:<>
                {!compact && <>
                    <Button className={cn('w-96 mt-8', compact && 'mt-0')} onClick={() => {signIn("google")}}>Log In</Button>
                    <span className='w-96 pt-6'>The Team Leader should login with their Google Account!</span>
                </>}
            </>}
        </div>
    )
}

export default UserCard;