import { alarmSettings } from './config.js';
import { setCookie } from './cookie.js';

const interval = [];

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
  const alertName = document.getElementById('name' + neededId).innerHTML
  interval[neededId] = setInterval(() => {
    if (alarmTime === document.getElementById('clock').innerHTML) {
      alert(`${alertName} went off`);
    }
  }, 1000);
};

const alarmClear = id => {
  const neededId = id.replace('clearButton', '');
  changeStateAlarm(neededId, false);
  setCookie(neededId, 2, false);
  clearInterval(interval[neededId]);
};

const alarmDel = id => {
  const neededId = id.replace('delButton', '');
  deleteDiv(neededId);
  clearInterval(interval[neededId]);
};

const alarmChangeName = id => {
  const neededId = id.replace('changeNameButton', '');
  const name = prompt('Type alarm name here');
  if (name) {
    document.getElementById('name' + neededId).innerHTML = name;
    setCookie(neededId, 2, false);
  }
};

export { getAlarmTime, alarmSet, alarmClear, alarmDel, alarmChangeName };
