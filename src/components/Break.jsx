import React, { useState } from "react";
import moment from "moment";

const Break = () => {
  const [breakTime, setBreakTime] = useState(300); // time in seconds

  const lowerBreakTimeByOneMinute = () => {
    const newBreakTime = breakTime - 60;

    if (newBreakTime < 0) {
      setBreakTime(0);
    } else {
      setBreakTime(newBreakTime);
    }
  };

  const raiseBreakTimeByOneMinute = () => {
    setBreakTime(breakTime + 60);
  };

  const breakTimeInMinutes = moment.duration(breakTime, "s").minutes();

  return (
    <div>
      <p id="break-label">Break</p>
      <p id="break-time">{breakTimeInMinutes}</p>
      <button id="break-lower" onClick={lowerBreakTimeByOneMinute}>
        -
      </button>
      <button id="break-raise" onClick={raiseBreakTimeByOneMinute}>
        +
      </button>
    </div>
  );
};

export default Break;
