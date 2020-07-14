/* global chrome */

import React, { useState, useEffect, useRef } from "react";
import Work from './components/Work'
import Break from './components/Break'
import Countdown from './components/Countdown'
import './App.css';

function App() {
  const audioElement = useRef(null);
  const [currentTimerType, setCurrentTimerType] = useState("Work");
  const [intervalId, setIntervalId] = useState(null);
  const [workTime, setWorkTime] = useState(60 * 25); // time in seconds
  const [breakTime, setBreakTime] = useState(300);
  const [countdown, setCountdown] = useState(workTime);

  chrome.storage.local.get(['intervalId', 'timer'], function (data) {
    if (data.intervalId) {
      console.log(data.intervalId);
      setCountdown(data.timer);
    };
  });

  // componentDidMount() {
  //   // On app load, check if there's existing data for a running timer. If not, set it.
  //   chrome.storage.local.get('intervalId', (data) => {
  //     console.log(data.intervalId);
  //     //use "in" check as a regular if(data.intervalId) will
  //     //return false for empty arrays
  //     if ('intervalId' in data) { setCountdown(data.countdown) };
  //     // else chrome.storage.sync.set({ allData: [] });
  //   });
  // }


  // TODO why is mount and unmount not working ?
  // componentWillUnmount() {
  //   // on app un-mounting
  //   chrome.storage.local.set({
  //     'timer': countdown,
  //     'intervalId': intervalId
  //   });
  //   // On app load, check if there's existing data for a running timer. If not, set it.
  //   chrome.storage.local.get('intervalId', (data) => {
  //     console.log(data.intervalId);
  //     //use "in" check as a regular if(data.intervalId) will
  //     //return false for empty arrays
  //     if ('intervalId' in data) {
  //       setCountdown(data.countdown);
  //       // this.setState({ allData });
  //     } // else chrome.storage.sync.set({ allData: [] });
  //   });
  // }

  // clear and create alarm

  // chrome.storage.local.get( ['start','timer'], function (data) {
  //   console.log(data.start);
  //   console.log(data.timer);
  // })

  // const savedTime = chrome.storage.local.get(['countdown'], function (item) {
  //   setCountdown(item.countdown);
  // })


  // if (savedTime) {
  //   setCountdown(savedTime);
  // }
  // // Call this when the pop-up is shown
  // chrome.runtime.sendMessage({ cmd: 'GET_TIME' }, response => {
  //   if (response.time) {
  //     const time = new Date(response.time);
  //     startTimer(time)
  //   }
  // });

  // Change countdown when workTime changes
  useEffect(() => {
    setCountdown(workTime);
  }, [workTime]);

  const lowerWorkTimeByOneMinute = () => {
    const newWorkTime = workTime - 60;

    if (newWorkTime < 0) {
      setWorkTime(0);
    } else if (newWorkTime === 0) {
      return
    } else {
      setWorkTime(newWorkTime);
    }
  };

  const raiseWorkTimeByOneMinute = () => {
    const newWorkTime = workTime + 60
    if (newWorkTime <= 60 * 60) {
      setWorkTime(newWorkTime)
    }
  };

  const isStarted = intervalId != null;

  // if countdown is zero, change work to break or break to work
  // TODO add popup alert
  // TODO add button click between sessions
  useEffect(() => {
    if (countdown === 0) {
      audioElement.current.play()
      if (currentTimerType === "Work") {
        setCurrentTimerType("Break");
        setCountdown(breakTime);
      } else if (currentTimerType === "Break") {
        setCurrentTimerType("Work");
        setCountdown(workTime);
      }
    }
  }, [breakTime, currentTimerType, workTime, countdown]);

  const handleStartStopClick = () => {
    if (isStarted) {
      // if timer is started
      // we want to stop and clear
      clearInterval(intervalId);
      setCountdown(workTime);
      setCurrentTimerType("Work");
      setIntervalId(null);
    } else {
      // if timer is stopped:

      // let minutes = (countdown / 6000);
      //chrome.alarms.create({ delayInMinutes: minutes });

      // lower countdown for each second
      // 1000 ms is 1 second
      const now = Date.now();
      console.log(now);
      // save to time to local storage and start countdown
      chrome.storage.local.set({
        'start': now,
        'timer': countdown
      });
      console.log("added now to local storage");
      chrome.storage.local.get(['start', 'timer'], function (data) {
        console.log(data.start);
        console.log(data.timer);
      })
      // start timer
      const newIntervalId = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 100); // TODO reset to 1000
      setIntervalId(newIntervalId);
      chrome.storage.local.set({ 'intervalId': intervalId });
    }
  };

  const handleResetButtonClick = () => {
    // reset audio
    audioElement.current.load()
    // clear the countdown interval
    clearInterval(intervalId)
    // set the intervalId null
    setIntervalId(null)
    // set the timertype to "Work"
    setCurrentTimerType('Work')
    // reset the workTime to 25 minutes
    setWorkTime(25 * 60)
    // reset the breakTime to 5
    setBreakTime(60 * 5)
    // reset the timer to 25 minutes (initial workTime)
    setCountdown(25 * 60)
  }

  const lowerBreakTimeByOneMinute = () => {
    const newBreakTime = breakTime - 60;
    if (newBreakTime < 0) {
      setBreakTime(0);
    } else if (newBreakTime === 0) {
      return
    } else {
      setBreakTime(newBreakTime);
    }
  };

  const raiseBreakTimeByOneMinute = () => {
    const newBreakTime = breakTime + 60
    if (newBreakTime <= 60 * 60) {
      setBreakTime(newBreakTime)
    }
  };


  return (
    <div className="App">

      <Work
        workTime={workTime}
        lowerWorkTimeByOneMinute={lowerWorkTimeByOneMinute}
        raiseWorkTimeByOneMinute={raiseWorkTimeByOneMinute}
      />
      <Countdown
        workTime={workTime}
        breakTime={breakTime}
        timerLabel={currentTimerType}
        handleStartStopClick={handleStartStopClick}
        startStopButtonLabel={isStarted ? "Stop" : "Start"}
        countdown={countdown}
      />
      <p>
        <button id="reset" onClick={handleResetButtonClick}>Reset</button>
      </p>
      <Break
        breakTime={breakTime}
        lowerBreakTimeByOneMinute={lowerBreakTimeByOneMinute}
        raiseBreakTimeByOneMinute={raiseBreakTimeByOneMinute}
      />

      <audio id="alarm" ref={audioElement}>
        <source src="https://www.soundjay.com/misc/sounds/magic-chime-01.mp3" />
      </audio>
    </div>
  );
}

export default App;
