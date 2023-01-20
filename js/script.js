import { alarmSet, alarmClear, alarmDel, alarmChangeName } from './alarmButtons.js';
import { alarmAdd } from './alarmStart.js';
import { addCookie, setCookie, checkCookie } from './cookie.js';

document.getElementById('addAlarm').addEventListener('click', alarmAdd);
document.getElementById('addAlarm').addEventListener('click', addCookie);
window.getAlarmTime = getAlarmTime;
window.alarmChangeName = alarmChangeName;
window.alarmSet = alarmSet;
window.setCookie = setCookie;
window.checkCookie = checkCookie;
window.alarmClear = alarmClear;
window.alarmDel = alarmDel;
