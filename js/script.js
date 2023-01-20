import { alarmSet, alarmClear, alarmDel, alarmChangeName } from './alarmButtons.js';
import { alarmAdd } from './alarmStart.js';

document.getElementById('addAlarm').addEventListener('click', alarmAdd);
window.alarmChangeName = alarmChangeName;
window.alarmSet = alarmSet;
window.alarmClear = alarmClear;
window.alarmDel = alarmDel;
