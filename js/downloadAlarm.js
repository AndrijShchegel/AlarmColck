import { alarmSettings } from './config.js';
import { getAlarmTime } from './alarmButtons.js';

const checked = id => {
  const doc = document.getElementById(alarmSettings.timeUnits[0] + id);
  if (doc) {
    return doc.disabled;
  } else {
    return 'deleted';
  }
};

const getName = id => document.getElementById('name' + id).innerHTML;

const getText = () => {
  let text = '';
  for (let i = 0; i < alarmSettings.index; i++) {
    if (checked(i) !== 'deleted') {
      text += getAlarmTime(i) + '-' + checked(i) + '-' + getName(i) + '-';
    }
  }
  return text.substring(0, text.length - 1);
};

export const downloadAlarm = () => {
  const text = getText();
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', 'Alarm_Settings.txt');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
