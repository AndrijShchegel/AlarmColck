'use strict';

const alarmType = ["alarmh", "alarmm", "alarms"];
const alarmValue = [24, 60, 60];
const alarmDiv = ["select", "button"];
const alarmButton = ["set", "clear", "del"];
let alarmInterval = [];
let index = 0;
let time;

const timeZero = (zero) => {
  return (zero < 10) ? "0" + zero : zero;
}

const currentTime = () => {
  let date = new Date(); 
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  time = timeZero(hours) + ":" + timeZero(minutes) + ":" + timeZero(seconds);
  document.getElementById("clock").innerHTML = time;
  setTimeout(currentTime, 1000);
}

currentTime();

const createDiv = () => {
  for (let i = 0; i < alarmDiv.length; i++){
  let smtg = document.createElement("div");
  smtg.setAttribute("id", alarmDiv[i] + index);
  }
  document.getElementById("alarm-container").appendChild(smtg);
}

const createSelect = () => {
  for (let i = 0; i < alarmType.length; i++){
  let smtg = document.createElement("select");
  smtg.setAttribute("id", alarmType[i] + index);
  for (let j=1; j <= alarmValue[i]; j++) {
		smtg.options[j-1] = new Option(timeZero(j-1));
	}
  document.getElementById("select" + index).appendChild(smtg);
  }
}
const createButton = () => {
  for (let i = 0; i < alarmButton.length; i++){
  let smtg = document.createElement("button");
  smtg.setAttribute("id", alarmButton[i] + "Button" + index);
  let upper = alarmButton[i].charAt(0).toUpperCase() + alarmButton[i].slice(1);
  smtg.setAttribute("onClick", `alarm${upper}(getAttribute('id'))`);
  }
  document.getElementById("button" + index).appendChild(smtg);
}

const changeStateAlarm = (id, bool) => {
  for (let i = 0; i < alarmType.length; i++){
  document.getElementById(alarmType[i] + id).disabled = bool;
}
}

const getAlarmTime = (id) => {
  let selected = "";
  for (let i = 0; i < alarmType.length; i++){
  let doc = document.getElementById(alarmType[i] + id);
  selected += doc.options[doc.selectedIndex].value + ":";
  }
  return selected.substring(0, selected.length - 1);
}

const deleteDiv = (id) => {
  for (let i = 0; i < alarmDiv.length; i++){
    document.getElementById(alarmDiv[i] + id).remove();
  }
}

const alarmAdd = () => {
  createDiv();
  createSelect();
  createButton();
  index++;
}

const alarmSet = (id) => {
  let neededId = id.replace("setButton", "");
  changeStateAlarm(neededId, true);
  let alarmTime = getAlarmTime(neededId);
  alarmInterval[neededId] = setInterval(() => {
  if (alarmTime == time) {
		alert("Hello");
	}
},1000);
}

const alarmClear = (id) => {
  let neededId = id.replace("clearButton", "");
  changeStateAlarm(neededId, false);
  clearInterval(alarmInterval[neededId]);
}

const alarmDelete = (id) => {
  let neededId = id.replace("deleteButton", "");
  deleteDiv(neededId);
  clearInterval(alarmInterval[neededId]);
}

const checked = (id) => {
  return document.getElementById(alarmType[0] + id).disabled;
}

const getText = () => {
  let text = "";
  for (let i = 0; i < index; i++){
    text += i + "-" + getAlarmTime(i) + "-" + checked(i) + "-";
  }
  return text.substring(0, text.length - 1);
}

const downloadAlarm = () => {
  let text = getText();
  let element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
  element.setAttribute("download", "Alarm_Settings.txt");
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
