import { alarmSet, alarmClear, alarmDel, alarmChangeName } from './alarmButtons.js';
import { alarmAdd } from './alarmStart.js';
import { setCookie, checkCookie } from './cookie.js';

document.getElementById('addAlarm').addEventListener('click', alarmAdd);
window.alarmChangeName = alarmChangeName;
window.alarmSet = alarmSet;
window.setCookie = setCookie;
window.checkCookie = checkCookie;
window.alarmClear = alarmClear;
window.alarmDel = alarmDel;
