import { useSession } from "next-auth/react";
import { useState } from "react";

export const useTryKey = (key: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState<string | null>(null);
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
            setErrMessage(data.message);
        } else {
            setSuccess(true);
        }
    } catch (error) {
      setErrMessage('Something went wrong');
      setError(true);
    }

    setLoading(false);
  }

  return { loading, error, success, errMessage, tryKey}
};
