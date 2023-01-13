'use strict';

import { alarmSettings } from "./config.js";

const addZero = num => ((num < 10) ? '0' + num : num);

setInterval(() => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const time = addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds);
  document.getElementById('clock').innerHTML = time;
}, 1000);

const createDiv = () => {
  for (let i = 0; i < alarmSettings.div.length; i++) {
    const doc = document.createElement('div');
    doc.setAttribute('id', alarmSettings.div[i] + alarmSettings.index);
    document.getElementById('alarm-container').appendChild(doc);
  }
};

const createSelect = () => {
  for (let i = 0; i < alarmSettings.timeUnits.length; i++) {
    const doc = document.createElement('select');
    doc.setAttribute('id', alarmSettings.timeUnits[i] + alarmSettings.index);
    for (let j = 0; j < alarmSettings.timeNumber[i]; j++) {
      doc.options[j] = new Option(addZero(j));
    }
    document.getElementById('select' + alarmSettings.index).appendChild(doc);
  }
};
const createButton = () => {
  for (let i = 0; i < alarmSettings.button.length; i++) {
    const doc = document.createElement('button');
    doc.setAttribute('id', alarmSettings.button[i] + 'Button' + alarmSettings.index);
    const upper = alarmSettings.button[i].charAt(0).toUpperCase() + alarmSettings.button[i].slice(1);
    doc.setAttribute('onClick', `alarm${upper}(getAttribute('id'))`);
    document.getElementById('button' + alarmSettings.index).appendChild(doc);
  }
};

export const alarmAdd = () => {
  createDiv();
  createSelect();
  createButton();
  alarmSettings.index++;
};
