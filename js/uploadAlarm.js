'use strict';

import { alarmSettings } from "./config.js";
import { alarmAdd } from "./alarmStart.js";
import { alarmDel, alarmSet } from "./alarmButtons.js";

const deleteAll = () => {
  for (let i = 0; i < alarmSettings.index; i++) {
    alarmDel('delButton' + i);
  }
};

const setSelected = (arr, id) => {
  for (let i = 0; i < alarmSettings.timeUnits.length; i++) {
    const doc = document.getElementById(alarmSettings.timeUnits[i] + id);
    doc.selectedIndex = parseInt(arr[i]);
  }
};

const updateAlarm = array => {
  deleteAll();
  alarmSettings.index = 0;
  const size = array.split('-');
  for (let i = 0; i < size.length; i += 3) {
    alarmAdd();
    const arr = size[i + 1].split(':');
    const newindex = alarmSettings.index - 1;
    setSelected(arr, newindex);
    if (size[i + 2] === 'true') {
      alarmSet('setButton' + newindex);
    }
  }
};

export const uploadAlarm = event => {
  const input = event.target;
  const reader = new FileReader();
  reader.onload = function() {
    const upload = reader.result;
    if (upload) {
      updateAlarm(upload);
    }
  };
  reader.readAsText(input.files[0]);
};
