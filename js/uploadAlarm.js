'use strict';

const uploadAlarm = (event) => {
    let input = event.target;
    let reader = new FileReader();
    reader.onload = function(){
      let upload = reader.result;
      if(upload){
        updateAlarm(upload);
      }
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
      alarmAdd();
      let arr = size[i + 1].split(":");
      let newindex = alarmSettings.index - 1;
      setSelected(arr, newindex);
      if (size[i + 2] === "true"){
        alarmSet("setButton" + newindex);
      }
    }
  }
  