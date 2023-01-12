'use strict';

const alarmSettings = {
  timeUnits: ["hours", "minutes", "seconds"],
  timeNumber: [24, 60, 60],
  div: ["select", "button"],
  button: ["set", "clear", "del"],
  interval: [],
  index: 0
};

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

const changeStateAlarm = (id, bool) => {
  for (let i = 0; i < alarmSettings.timeUnits.length; i++){
  document.getElementById(alarmSettings.timeUnits[i] + id).disabled = bool;
}
}

const getAlarmTime = (id) => {
  let selected = "";
  for (let i = 0; i < alarmSettings.timeUnits.length; i++){
  let doc = document.getElementById(alarmSettings.timeUnits[i] + id);
  selected += doc.options[doc.selectedIndex].value + ":";
  }
  return selected.substring(0, selected.length - 1);
}

const deleteDiv = (id) => {
  for (let i = 0; i < alarmSettings.div.length; i++){
    let doc = document.getElementById(alarmSettings.div[i] + id);
    if(doc)
    doc.remove();
  }
}

const alarmAdd = () => {
  createDiv();
  createSelect();
  createButton();
  alarmSettings.index++;
}

const alarmSet = (id) => {
  let neededId = id.replace("setButton", "");
  changeStateAlarm(neededId, true);
  let alarmTime = getAlarmTime(neededId);
  alarmSettings.interval[neededId] = setInterval(() => {
    if (alarmTime === document.getElementById("clock").innerHTML) {
		alert("Hello");
	  }
  }, 1000);
}

const alarmClear = (id) => {
  let neededId = id.replace("clearButton", "");
  changeStateAlarm(neededId, false);
  clearInterval(alarmSettings.interval[neededId]);
}

const alarmDel = (id) => {
  let neededId = id.replace("delButton", "");
  deleteDiv(neededId);
  clearInterval(alarmSettings.interval[neededId]);
}

const checked = (id) => {
  return document.getElementById(alarmSettings.timeUnits[0] + id).disabled;
}

const getText = () => {
  let text = "";
  for (let i = 0; i < alarmSettings.index; i++){
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

const uploadAlarm = (event) => {
  let input = event.target;
  let reader = new FileReader();
  reader.onload = function(){
    let upload = reader.result;
    if(upload)
    updateAlarm(upload);
  };
  reader.readAsText(input.files[0]);
};

const deleteAll = () => {
  for (let i = 0; i < alarmSettings.index; i++){
    alarmDel("delButton"+i);
  }
}

const setSelected = (arr, size) => {
  for (let j = 0; j < alarmSettings.timeUnits.length; j++){
  let doc = document.getElementById(alarmSettings.timeUnits[j] + size);
  doc.selectedIndex = parseInt(arr[j]);
  }
}

const updateAlarm = (array) => {
  deleteAll();
  alarmSettings.index = 0;
  let size = array.split("-");
  for (let i = 0; i < size.length; i+=3){
    let arr = size[i+1].split(":");
    alarmAdd();
    setSelected(arr, size[i]);
    if (size[i+2] === "true"){
      alarmSet("setButton" + size[i]);
    }
  }
}
