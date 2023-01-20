import { alarmSet, alarmClear, alarmDel, alarmChangeName, getAlarmTime } from './alarmButtons.js';
import { addCookie, checkCookie, changeCookie } from './cookie.js';
import { alarmAdd } from './alarmStart.js';

document.getElementById('addAlarm').addEventListener('click', addCookie);
document.getElementById('addAlarm').addEventListener('click', alarmAdd);
window.alarmChangeName = alarmChangeName;
window.getAlarmTime = getAlarmTime;
window.changeCookie = changeCookie;
window.checkCookie = checkCookie;
window.alarmClear = alarmClear;
window.alarmSet = alarmSet;
window.alarmDel = alarmDel;
