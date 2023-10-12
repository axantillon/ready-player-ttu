'use client'
import { DateTime, Duration, DurationObjectUnits } from 'luxon';
import { FC, useEffect, useState } from 'react';

interface CountdownProps {
  deadline: DateTime;
}

const Countdown: FC<CountdownProps> = ({ deadline }) => {

    const [countdown, setCountdown] = useState<DurationObjectUnits>(deadline.diff(DateTime.now(), ['days', 'hours', 'minutes', 'seconds']).toObject())
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        const interval = setInterval(() => {
            setCountdown(deadline.diff(DateTime.now(), ['days', 'hours', 'minutes', 'seconds']).toObject())
        }, 1000);
        return () => clearInterval(interval);
    }, [deadline]);

    if (!countdown) return <></>

    return (<>
       {isClient ? 
            <span>{countdown.days !== 0 && (countdown.days + ' Days, ')}{countdown.hours} Hours & {countdown.seconds?.toFixed(0)} Seconds</span> 
        : <></> }
    </>)
}

export default Countdown;