import { useEffect, useState } from "react";
import prisma from "../prisma";

export default function useTeamMembers(leaderEmail: string) {
  const [teamMembers, setTeamMembers] = useState<string[] | null | undefined>(
    null
  );

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const members = await fetch(`/api/team/${leaderEmail}`).then((res) =>
        res.json()
      );
      setTeamMembers(members);
    };
    if (teamMembers === null && leaderEmail) {
      fetchTeamMembers();
    }
  }, [teamMembers, leaderEmail]);

  const addTeamMember = async (name: string) => {
    try {
      const members = await fetch(`/api/team/${leaderEmail}`, {
        method: "POST",
        body: JSON.stringify({ name }),
      }).then((res) => res.json());

      setTeamMembers(members);
    } catch (error) {
      console.log(error);
    }
  };

  const removeTeamMember = async (name: string) => {
    try {
      const members = await fetch(`/api/team/${leaderEmail}`, {
        method: "DELETE",
        body: JSON.stringify({
          members: teamMembers?.filter((member) => member !== name),
        }),
      }).then((res) => res.json());
      setTeamMembers(members);
    } catch (error) {
      console.log(error);
    }
  };

  return { teamMembers, addTeamMember, removeTeamMember };
}
