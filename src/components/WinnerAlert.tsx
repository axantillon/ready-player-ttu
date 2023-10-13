import { User } from '@prisma/client';
import { FC } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogContent } from './ui/alert-dialog';
import Image from 'next/image';
import GoldenEgg from '@/lib/assets/goldEgg.png'
import Countdown from './Countdown';
import { DateTime } from 'luxon';
import { startTime } from '@/lib/utils/consts';

interface WinnerAlertProps {
  open: boolean
  setOpen: (open: boolean) => void
  winner?: User  
}

const WinnerAlert: FC<WinnerAlertProps> = ({ open, winner, setOpen }) => {

    console.log(winner)

    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <div className="flex flex-col items-center justify-center space-y-6">
                    <span>Congratulations, <span className='text-red-500'>{winner?.groupName}</span>! 🎉🎉🎉🎉</span>
                    <span>You have found... the Egg!</span>

                    <div className="relative w-32 h-32 aspect-square -mr-7">
                        <Image src={GoldenEgg} alt='' fill />
                    </div>

                    <div className="text-sm">
                        {winner?.goldKeyTime && <span>You acquired the <span className='text-yellow-400'>Gold</span> Key in <Countdown deadline={DateTime.fromISO(winner.goldKeyTime as unknown as string)} from={startTime} update={false} /> </span>}
                        <br/>
                        {winner?.emeraldKeyTime && <span>You acquired the <span className='text-green-400'>Emerald</span> Key in <Countdown deadline={DateTime.fromISO(winner.emeraldKeyTime as unknown as string)} from={startTime} update={false} /> </span>}
                        <br/>
                        {winner?.crystalKeyTime && <span>You acquired the <span className='text-cyan-400'>Crystal</span> Key in <Countdown deadline={DateTime.fromISO(winner.crystalKeyTime as unknown as string)} from={startTime} update={false} /> </span>}
                    </div>

                    <AlertDialogAction onClick={() => setOpen(false)}> {"Let's go!"} </AlertDialogAction>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default WinnerAlert;