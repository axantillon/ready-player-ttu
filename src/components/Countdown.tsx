'use client'
import { DateTime, Duration, DurationObjectUnits } from 'luxon';
import { FC, useEffect, useState } from 'react';

interface CountdownProps {
  deadline: DateTime;
  from?: DateTime;
  update?: boolean
}

const Countdown: FC<CountdownProps> = ({ deadline, from = DateTime.now(), update = true }) => {

    const [countdown, setCountdown] = useState<DurationObjectUnits>(deadline.diff(from, ['days', 'hours', 'minutes', 'seconds']).toObject())
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        if (!update) return;
        const interval = setInterval(() => {
            setCountdown(deadline.diff(DateTime.now().toLocal(), ['days', 'hours', 'minutes', 'seconds']).toObject())
        }, 1000);
        return () => clearInterval(interval);
    }, [deadline, update]);

    if (!countdown) return <></>

    return (<>
       {isClient ? 
            <span>{countdown.days !== 0 && (countdown.days + ' Days, ')}{countdown.hours} Hours, {countdown.minutes} Minutes & {countdown.seconds?.toFixed(0)} Seconds</span> 
        : <></> }
    </>)
}

export default Countdown;