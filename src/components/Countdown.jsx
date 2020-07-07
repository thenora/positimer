import React, { useState } from "react";
import moment from "moment";
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment)


const Countdown = ({ workTime }) => {
  const [countdown, setCountdown] = useState(workTime);
  const formattedCountdown = moment.duration(countdown, 's').format('mm:ss');
  return <div>{formattedCountdown}</div>;
};

export default Countdown;
