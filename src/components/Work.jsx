import React from "react";
import moment from "moment";

const Work = ({
  workTime,
  lowerWorkTimeByOneMinute,
  raiseWorkTimeByOneMinute,
}) => {
  const workTimeInMinutes = moment.duration(workTime, "s").asMinutes();

  return (
    <section className="section">
      <div className="container">
        <h3 class="work-label">How long should your work timer be?</h3>
        <p class="work-time">{workTimeInMinutes}</p>
        <button class="work-lower" className="button is-secondary is-small" onClick={lowerWorkTimeByOneMinute}>
          -
        </button>
        <button class="work-raise" className="button is-secondary is-small" onClick={raiseWorkTimeByOneMinute}>
          +
        </button>
      </div>
    </section>
  );
};

export default Work;
