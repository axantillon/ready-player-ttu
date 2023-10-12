import { useEffect, useState } from "react";

export default function useTeamMembers(leaderEmail: string) {
  const [teamMembers, setTeamMembers] = useState<string[] | null | undefined>(
    null
  );
  const [teamName, setTeamName] = useState<string | null | undefined>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const members = await fetch(`/api/team/${leaderEmail}`).then(
        (res) => res.json()
      );
      setTeamMembers(members);
    };

    const fetchTeamName = async () => {
      const teamName = await fetch(`/api/team/name/${leaderEmail}`).then(
        (res) => res.json()
      );
      setTeamName(teamName);
    };

    if (teamMembers === null && leaderEmail) {
      fetchTeamMembers();
    }

    if (teamName === null && leaderEmail) {
      fetchTeamName();
    }
  }, [teamMembers, leaderEmail, teamName]);

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

  const changeTeamName = async (name: string) => {
    try {
      const teamName = await fetch(`/api/team/name/${leaderEmail}`, {
        method: "POST",
        body: JSON.stringify({ name }),
      }).then((res) => res.json());
      setTeamName(teamName);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    teamMembers,
    addTeamMember,
    removeTeamMember,
    teamName,
    changeTeamName,
  };
}
