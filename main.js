'use strict';
const hrs = 24;
const min = 60;
const sec = 60;
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

const selectOption = (select, max) => {
	for (let i=1; i <= max; i++) {
		select.options[select.options.length] = new Option(timeZero(i));
	}
}

const createDiv = (...whatId) => {
  for (let i = 0; i < whatId.length; i++){
  let smtg = document.createElement("div");
  smtg.setAttribute("id", whatId[i] + index);
  document.getElementById("alarm-container").appendChild(smtg);
  }
}

const createSelect = (...whatId) => {
  for (let i = 0; i < whatId.length; i++){
  let smtg = document.createElement("select");
  smtg.setAttribute("id", whatId[i] + index);
  document.getElementById("select" + index).appendChild(smtg);
  }
}

const createButton = (...whatId) => {
  for (let i = 0; i < whatId.length; i++){
  let smtg = document.createElement("button");
  smtg.setAttribute("id", whatId[i] + "Button" + index);
  let upper = whatId[i].charAt(0).toUpperCase() + whatId[i].slice(1);
  smtg.setAttribute("onClick", `alarm${upper}(getAttribute('id'))`);
  document.getElementById("button" + index).appendChild(smtg);
  }
}

const alarmAdd = () => {
  createDiv("select", "button");
  createSelect("alarmh", "alarmm", "alarms");
  createButton("set", "clear", "del");
  selectOption(document.getElementById("alarmh" + index), hrs);
  selectOption(document.getElementById("alarmm" + index), min);
  selectOption(document.getElementById("alarms" + index), sec);
  index++;
}
const alarmSet = (id) => {
  let neededId = id.replace("setButton", "");
  document.getElementById("alarmh" + neededId).disabled = true;
	document.getElementById("alarmm" + neededId).disabled = true;
	document.getElementById("alarms" + neededId).disabled = true;
  let hr = document.getElementById("alarmh" + neededId);
  let selectedHour = hr.options[hr.selectedIndex].value;
  let mi = document.getElementById("alarmm" + neededId);
  let selectedMin = mi.options[mi.selectedIndex].value;
  let se = document.getElementById("alarms" + neededId);
  let selectedSec = se.options[se.selectedIndex].value;
  let alarmTime = selectedHour + ":" + selectedMin + ":" + selectedSec;
  const myInterval = setInterval(function(){
  if (alarmTime == time) {
		alert("Hello");
	}
},1000);
}
const alarmClear = (id) => {
  let neededId = id.replace("clearButton", "");
  document.getElementById("alarmh" + neededId).disabled = false;
	document.getElementById("alarmm" + neededId).disabled = false;
	document.getElementById("alarms" + neededId).disabled = false;
}
const alarmDelete = (id) => {
  let neededId = id.replace("deleteButton", "");
  document.getElementById("select" + neededId).remove();
  document.getElementById("button" + neededId).remove();
}
