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
    const { loading, error, errMessage, success, tryKey} = useTryKey(Key)

    const attemptKey = async () => {
        await tryKey(keyAttempt)
    }

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex space-x-2">
                <Input disabled={success} value={keyAttempt} onChange={(e) => setKeyAttempt(e.target.value)} placeholder={`Enter the ${Key} Key...`} />
                <Button onClick={() => attemptKey()}>Claim</Button>
            </div>
            {success && <span>You got it! 🎉 <br/> <b>Now hurry back to the previous screen!</b></span>}
            {error && <span>Try again! {errMessage}</span>}
            {loading && <span>Trying...</span>}
        </div>
    )
}

export default KeyInput;