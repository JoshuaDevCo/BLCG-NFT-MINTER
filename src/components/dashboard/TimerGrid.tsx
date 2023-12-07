import React, { useState, useEffect } from 'react';

const TimerGrid = () => {
  // Set your target date for the countdown
  const targetDate = new Date('2023-12-09T00:00:00Z');

  const calculateTimeDifference = () => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      // Target date has passed, set countdown to 0
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return {
      days: days % 365,
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60,
    };
  };

  const [countdown, setCountdown] = useState(calculateTimeDifference);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(calculateTimeDifference);
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="timeGrid grid-flow-col gap-5 text-center auto-cols-max">
      <div className="flex flex-col p-2 bg-neutral text-center rounded-box text-neutral-content">
        <span className="countdown font-mono text-portal text-3xl">
          <span style={{ "--value": countdown.days } as React.CSSProperties}>{countdown.days}</span>
        </span>
        days
      </div>
      <div className="flex flex-col p-2 bg-neutral text-center rounded-box text-neutral-content">
        <span className="countdown font-mono text-portal text-3xl">
          <span style={{ "--value": countdown.hours } as React.CSSProperties}>{countdown.hours}</span>
        </span>
        hours
      </div>
      <div className="flex flex-col p-2 bg-neutral text-center rounded-box text-neutral-content">
        <span className="countdown font-mono text-portal text-3xl">
          <span style={{ "--value": countdown.minutes } as React.CSSProperties}>{countdown.minutes}</span>
        </span>
        min
      </div>
      <div className="flex flex-col p-2 bg-neutral text-center rounded-box text-neutral-content">
        <span className="countdown font-mono text-portal text-3xl">
          <span style={{ "--value": countdown.seconds } as React.CSSProperties}>{countdown.seconds}</span>
        </span>
        sec
      </div>
    </div>
  );
};

export default TimerGrid;
