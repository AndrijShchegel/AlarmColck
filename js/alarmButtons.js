import { alarmSettings } from './config.js';

const deleteDiv = id => {
  for (let i = 0; i < alarmSettings.div.length; i++) {
    const doc = document.getElementById(alarmSettings.div[i] + id);
    if (doc) {
      doc.remove();
    }
  }
};

const changeStateAlarm = (id, bool) => {
  for (let i = 0; i < alarmSettings.timeUnits.length; i++) {
    document.getElementById(alarmSettings.timeUnits[i] + id).disabled = bool;
  }
};

const getAlarmTime = id => {
  let selected = '';
  for (let i = 0; i < alarmSettings.timeUnits.length; i++) {
    const doc = document.getElementById(alarmSettings.timeUnits[i] + id);
    if (doc) {
      selected += doc.options[doc.selectedIndex].value + ':';
    }
  }
  return selected.substring(0, selected.length - 1);
};

const alarmSet = id => {
  const neededId = id.replace('setButton', '');
  changeStateAlarm(neededId, true);
  const alarmTime = getAlarmTime(neededId);
  alarmSettings.interval[neededId] = setInterval(() => {
    if (alarmTime === document.getElementById('clock').innerHTML) {
      alert(`Alarm ${id} went off`);
    }
  }, 1000);
};

const alarmClear = id => {
  const neededId = id.replace('clearButton', '');
  changeStateAlarm(neededId, false);
  clearInterval(alarmSettings.interval[neededId]);
};

const alarmDel = id => {
  const neededId = id.replace('delButton', '');
  deleteDiv(neededId);
  clearInterval(alarmSettings.interval[neededId]);
};

export { getAlarmTime, alarmSet, alarmClear, alarmDel };
