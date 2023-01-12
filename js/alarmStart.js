'use strict';

import { alarmSettings } from "./config.js";

const addZero = (num) => {
    return (num < 10) ? "0" + num : num;
  }
  
  setInterval(() => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let time = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);
    document.getElementById("clock").innerHTML = time;
  },1000);
  
  const createDiv = () => {
    for (let i = 0; i < alarmSettings.div.length; i++){
    let smtg = document.createElement("div");
    smtg.setAttribute("id", alarmSettings.div[i] + alarmSettings.index);
    document.getElementById("alarm-container").appendChild(smtg);
    }
  }
  
  const createSelect = () => {
    for (let i = 0; i < alarmSettings.timeUnits.length; i++){
    let smtg = document.createElement("select");
    smtg.setAttribute("id", alarmSettings.timeUnits[i] + alarmSettings.index);
    for (let j=0; j < alarmSettings.timeNumber[i]; j++) {
          smtg.options[j] = new Option(addZero(j));
      }
    document.getElementById("select" + alarmSettings.index).appendChild(smtg);
    }
  }
  const createButton = () => {
    for (let i = 0; i < alarmSettings.button.length; i++){
    let smtg = document.createElement("button");
    smtg.setAttribute("id", alarmSettings.button[i] + "Button" + alarmSettings.index);
    let upper = alarmSettings.button[i].charAt(0).toUpperCase() + alarmSettings.button[i].slice(1);
    smtg.setAttribute("onClick", `alarm${upper}(getAttribute('id'))`);
    document.getElementById("button" + alarmSettings.index).appendChild(smtg);
    }
  }
  
  export const alarmAdd = () => {
    createDiv();
    createSelect();
    createButton();
    alarmSettings.index++;
  }
