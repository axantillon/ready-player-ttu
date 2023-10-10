import { useSession } from "next-auth/react";
import { useState } from "react";

export const useTryKey = (key: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { data: session } = useSession()

  const tryKey = async (attempt:string) => {
    setLoading(true);
    setError(false);
    setSuccess(false);
    
    try {
        const response = await fetch(`/api/keys/${key}/?attempt=${attempt}&leaderEmail=${session?.user?.email}`);
        const data = await response.json();
    
        if (data.error) {
            setError(true);
        } else {
            setSuccess(true);
        }
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  }

  return { loading, error, success, tryKey}
};
