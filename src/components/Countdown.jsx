import React, { useState } from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { useEffect } from "react";

momentDurationFormatSetup(moment);

const Countdown = ({ workTime }) => {
  const [countdown, setCountdown] = useState(workTime);

  // Change countdown when workTime changes
  useEffect(() => {
    setCountdown(workTime);
  }, [workTime]);

  const handleStartStopClick = () => {
    // lower countdown for each second
    // 1000 ms is 1 second
    setInterval(() => {
      setCountdown((prevCountdown) => {
        const newCountdown = prevCountdown - 1;
        if (newCountdown >= 0) {
          return prevCountdown - 1;
        }
        return prevCountdown;
      });
    }, 1000);
  };

  const formattedCountdown = moment.duration(countdown, "s").format("mm:ss", {trim: false});
  return (
    <div>
      <p>{formattedCountdown}</p>
      <button onClick={handleStartStopClick}>Start</button>
    </div>
  );
};

export default Countdown;
