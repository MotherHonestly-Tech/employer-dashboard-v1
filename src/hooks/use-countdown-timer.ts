import React from 'react';

const useCountdownTimer = (initialTime: number) => {
  const [time, setTime] = React.useState(initialTime);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    if (time === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [time]);

  return time;
};

export default useCountdownTimer;
