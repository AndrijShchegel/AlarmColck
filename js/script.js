import { alarmSet, alarmClear, alarmDel } from './alarmButtons.js';
import { downloadAlarm } from './downloadAlarm.js';
import { uploadAlarm } from './uploadAlarm.js';
import { alarmAdd } from './alarmStart.js';

document.getElementById('addAlarm').addEventListener('click', alarmAdd);
document.getElementById('downloadButton').addEventListener('click', downloadAlarm);
document.getElementById('uploadButton').addEventListener('change', uploadAlarm);
window.alarmSet = alarmSet;
window.alarmClear = alarmClear;
window.alarmDel = alarmDel;
