'use client'
import { cn } from '@/lib/utils/cn';
import { signIn, signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { MiniTeamMembers, TeamMembers } from './TeamMembers';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

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
        <DropdownMenu>
            <div className="flex flex-col items-start">
                <span>Team Leader:</span>
                {status === 'authenticated' ? 
                    <DropdownMenuTrigger>
                        <div className='flex flex-col space-y-4'>
                            <div className={'w-96 p-2 flex space-x-4 items-center border rounded-md'}>
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
                    </DropdownMenuTrigger>
                :<>
                    <Button className={cn('w-96 mt-8', compact && 'mt-0')} onClick={() => {signIn("google")}}>Log In</Button>
                    <span className='w-96 pt-6'>The Team Leader should login with their Google Account!</span>
                </>}
            </div>
            {compact && 
                <DropdownMenuContent className='w-96'>
                    <DropdownMenuLabel>Team Members</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <MiniTeamMembers leaderEmail={session?.user?.email!!} />
                    <DropdownMenuSeparator />
                    <Button className='w-full'>Edit Team</Button>
                </DropdownMenuContent>
            }
        </DropdownMenu>
    )
}

export default UserCard;