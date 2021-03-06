import React from "react";
import moment from "moment";

const Break = ({
  breakTime,
  lowerBreakTimeByOneMinute,
  raiseBreakTimeByOneMinute,
}) => {
  const breakTimeInMinutes = moment.duration(breakTime, "s").asMinutes();

  return (
    <section className="section">
      <div className="container content is-medium">
        <p className="break-label">How long should your break be?</p>
        <p className="break-time">{breakTimeInMinutes}</p>
        <button
          className="button is-secondary is-medium break-lower"
          onClick={lowerBreakTimeByOneMinute}
        >
          -
        </button>
        <button
          className="button is-secondary is-medium break-raise"
          onClick={raiseBreakTimeByOneMinute}
        >
          +
        </button>
      </div>
    </section>
  );
};

export default Break;
