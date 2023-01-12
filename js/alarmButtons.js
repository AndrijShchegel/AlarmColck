'use strict';

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
      if(doc){
        doc.remove();
      }
    }
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
  