import React, { useState } from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

const Countdown = ({
  handleStartStopClick,
  timerLabel,
  countdown,
  startStopButtonLabel,
}) => {
  const formattedCountdown = moment
    .duration(countdown, "s")
    .format("mm:ss", { trim: false });

  return (
    <div>
      <p id="timer-label">
        {timerLabel === "Work"
          ? "Let's get to work!"
          : "You earned this break!"}
      </p>
      <p id="clock">{formattedCountdown}</p>

      <button className="button is-primary is-large" onClick={handleStartStopClick}>{startStopButtonLabel}</button>
    </div>
  );
};

export default Countdown;
