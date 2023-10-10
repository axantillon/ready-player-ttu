'use client'
import useTeamMembers from '@/lib/hooks/useTeamMembers';
import { FC, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface TeamMembersProps {
  leaderEmail: string;
}

export const MiniTeamMembers: FC<TeamMembersProps> = ({ leaderEmail }) => {

    const { teamMembers } = useTeamMembers(leaderEmail)

    return (<>
        {teamMembers && teamMembers.map((member, index) => (
            <div key={index} className="w-full">
                <span>{member}</span>
            </div>
        ))}
    </>)
}

export const TeamMembers: FC<TeamMembersProps> = ({ leaderEmail }) => {

    const { teamMembers, addTeamMember, removeTeamMember } = useTeamMembers(leaderEmail)
    const [newTeamMember, setNewTeamMember] = useState<string>('')

    return (
        <div className={'flex flex-col'}>
            <span>Team Members:</span>
            {teamMembers ? teamMembers.map((member, index) => (
                <div key={index} className={'p-2 mb-2 flex space-x-4 items-center justify-between border rounded-md'}>
                    <span>{member}</span>
                    <Button variant={'destructive'} onClick={() => removeTeamMember(member)}>Remove</Button>
                </div>
            ))
            :
                <span>{teamMembers === null && 'Loading...'}</span>
            }
            <div className="flex items-center w-full space-x-2 mt-4">
                <span>Name: </span>
                <Input value={newTeamMember} onChange={(e) => {setNewTeamMember(e.target.value)}} placeholder={'Add Team Member'} />
                <Button className='bg-green-500 hover:bg-green-600' onClick={() => {addTeamMember(newTeamMember); setNewTeamMember('')}}> Join </Button>
            </div>
        </div>
    )
}