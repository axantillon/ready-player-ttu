'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTryKey } from '@/lib/hooks/useTryKey';
import { FC } from 'react';
import useLocalStorage from "use-local-storage";


interface KeyInputProps {
  Key: string
}

const KeyInput: FC<KeyInputProps> = ({ Key }) => {

    const [keyAttempt, setKeyAttempt] = useLocalStorage<string>(Key, "");
    const { loading, error, success, tryKey} = useTryKey(Key)

    const attemptKey = async () => {
        await tryKey(keyAttempt)
    }

    return (
        <div className="">
            <Input disabled={success} value={keyAttempt} onChange={(e) => setKeyAttempt(e.target.value)} placeholder={`Enter the ${Key} Key...`} />
            <Button onClick={() => attemptKey()}>Claim</Button>
            {success && <span>You got it!</span>}
            {error && <span>Try again!</span>}
            {loading && <span>Trying...</span>}
        </div>
    )
}

export default KeyInput;