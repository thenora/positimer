import React from "react";
import moment from "moment";

const Break = ({
  breakTime,
  lowerBreakTimeByOneMinute,
  raiseBreakTimeByOneMinute,
  skipBreak,
}) => {
  const breakTimeInMinutes = moment.duration(breakTime, "s").asMinutes();

  return (
    <div>
      <div>
        <p id="break-label">How long should your break be?</p>
        <p id="break-time">{breakTimeInMinutes}</p>
        <button id="break-lower" onClick={lowerBreakTimeByOneMinute}>
          -
        </button>
        <button id="break-raise" onClick={raiseBreakTimeByOneMinute}>
          +
        </button>
      </div>
    </div>
  );
};

export default Break;
