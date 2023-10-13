'use client'
import { FC } from 'react';
import { endTime, isHackathonOver, isHackathonStarted, startTime } from '@/lib/utils/consts';
import Countdown from '@/components/Countdown';


const ScoreboardCountdown: FC = ({  }) => {

    return (<>{
        isHackathonStarted ? <>
            { isHackathonOver ?
                <span>The <span className='text-red-500'>Hunt</span> is now over...</span>
            :
                <span>There are <Countdown deadline={endTime} /> left!</span>
            }
        </>:
            <span>The <span className='text-red-500'>Hunt</span> begins in <Countdown deadline={startTime} />...</span>
    }</>)
}

export default ScoreboardCountdown;