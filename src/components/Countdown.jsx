import React, { useState } from "react";

const Countdown = ({ workTime }) => {
  const [countdown, setCountdown] = useState(workTime);
  return <div>{countdown}</div>;
};

export default Countdown;
