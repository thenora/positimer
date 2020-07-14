/* global chrome */

let timerID;
let timerTime;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.cmd === 'START_TIMER') {
    timerTime = new Date(request.when);
    timerID = setTimeout(() => {
       // the time is app, alert the user.
    }, timerTime.getTime() - Date.now());
  } else if (request.cmd === 'GET_TIME') {
    sendResponse({ time: timerTime });
  }
});

// chrome.alarms.create('refresh', { periodInMinutes: 1 });

// chrome.alarms.onAlarm.addListener((alarm) => {
//   alert("Time's up!");
// });


// chrome.alarms.onAlarm.addListener(function() {
//   chrome.browserAction.setBadgeText({text: ''});
//   chrome.notifications.create({
//       type:     'basic',
//       iconUrl:  'src/imgs/600px-Gold_Star.svg.png',
//       title:    'Yes!',
//       message:  'You\'re doing great\'!',
//       buttons: [
//         {title: 'Keep going.'}
//       ],
//       priority: 0});
// });

// TODO this is from the drink water extension
// chrome.notifications.onButtonClicked.addListener(function() {
//   chrome.storage.local.get(['minutes'], function(item) {
//     chrome.browserAction.setBadgeText({text: 'ON'});
//     chrome.alarms.create({delayInMinutes: item.minutes});
//   });
// });