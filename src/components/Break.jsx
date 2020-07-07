import React from "react";
import moment from "moment";

const Break = ({
  breakTime,
  lowerBreakTimeByOneMinute,
  raiseBreakTimeByOneMinute,
}) => {
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
