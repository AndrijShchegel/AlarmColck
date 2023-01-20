import { alarmSettings } from './config.js';
import { alarmAdd } from './alarmStart.js';
import { alarmSet } from './alarmButtons.js';

const cookie = {
  name: ['name', 'time', 'isSet'],
  defValue: ['Alarm', '00:00:00', 'false']
};

const expireDate = () => {
  const date = new Date();
  date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
  return 'expires=' + date.toUTCString();
};

const setCookie = (id, name, value, expires) => {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].indexOf(name) === 0) {
      const coockieValue = cookies[i].substring(name.length + 1, cookies[i].length);
      const array = coockieValue.split('-');
      array[id] = value;
      let string = '';
      for (let j = 0; j < array.length; j++) string += '-' + array[j];
      document.cookie = name + '=' + string.slice(1) + ';' + expires + ';path=/';
      break;
    }
  }
};

const addCookie = () => {
  const expires = expireDate();
  if (!document.cookie) {
    for (let i = 0; i < cookie.name.length; i++) {
      document.cookie = cookie.name[i] + '=' + cookie.defValue[i] + ';' + expires + ';path=/';
    }
    return;
  }
  for (const name of cookie.name) {
    setCookie(alarmSettings.index - 1, name, cookie.defValue[j], expires);
  }
};

const changeCookie = (id, name, value) => {
  const neededId = id.replace(/[a-zA-Z]+/, '');
  const expires = expireDate();
  setCookie(neededId, name, value, expires);
};

const setSelected = (arr, id) => {
  for (let j = 0; j < alarmSettings.timeUnits.length; j++) {
    const doc = document.getElementById(alarmSettings.timeUnits[j] + id);
    doc.selectedIndex = parseInt(arr[j]);
  }
};

const checkCookie = () => {
  if (document.cookie === '') return;
  const cookies = document.cookie.split('; ');
  for (const name of cookie.name) {
    for (let i = 0; i < cookies.length; i++) {
      if (cookies[i].indexOf(name) === 0) {
        const coockieValue = cookies[i].substring(name.length + 1, cookies[i].length);
        const array = coockieValue.split('-');
        for (let j = 0; j < array.length; j++) {
          if (name === 'name') {
            alarmAdd();
            document.getElementById('name' + j).innerHTML = array[j];
          } else if (name === 'time') {
            const arr = array[j].split(':');
            setSelected(arr, j);
          } else if (name === 'isSet') {
            if (array[j] === 'true') {
              alarmSet('setButton' + j);
            }
          }
        }
      }
    }
  }
};

export { addCookie, changeCookie, checkCookie };
