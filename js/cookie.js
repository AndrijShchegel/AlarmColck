import { alarmSettings } from './config.js';
import { alarmAdd } from './alarmStart.js';
import { alarmSet } from './alarmButtons.js';

const cookie = {
  name: ['name', 'time', 'isSet'],
  defValue: ['Alarm', '00:00:00', 'false']
};

const addCookie = () => {
  const date = new Date();
  date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
  const expires = 'expires=' + date.toUTCString();
  if (!document.cookie) {
    for (let i = 0; i < cookie.name.length; i++) {
      document.cookie = cookie.name[i] + '=' + cookie.defValue[i] + ';' + expires + ';path=/';
    }
    return '';
  }
  for (let sii = 0; sii < cookie.name.length; sii++) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      if (cookies[i].indexOf(cookie.name[sii]) === 0) {
        const coockieValue = cookies[i].substring(cookie.name[sii].length + 1, cookies[i].length);
        const array = coockieValue.split('-');
        array[alarmSettings.index - 1] = cookie.defValue[sii];
        let string = '';
        for (let j = 0; j < array.length; j++) string += '-' + array[j];
        document.cookie = cookie.name[sii] + '=' + string.slice(1) + ';' + expires + ';path=/';
      }
    }
  }
};

const setCookie = (id, nameId, value) => {
  const neededId = id.replace(/[a-zA-Z]+/, '');
  const cookies = document.cookie.split('; ');
  const date = new Date();
  date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
  const expires = 'expires=' + date.toUTCString();
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].indexOf(cookie.name[nameId]) === 0) {
      const coockieValue = cookies[i].substring(cookie.name[nameId].length + 1, cookies[i].length);
      const arr = coockieValue.split('-');
      arr[neededId] = value;
      let str = '';
      for (let j = 0; j < arr.length; j++) str += '-' + arr[j];
      document.cookie = cookie.name[nameId] + '=' + str.slice(1) + ';' + expires + ';path=/';
      break;
    }
  }
};

const setSelected = (arr, id) => {
  for (let j = 0; j < alarmSettings.timeUnits.length; j++) {
    const doc = document.getElementById(alarmSettings.timeUnits[j] + id);
    doc.selectedIndex = parseInt(arr[j]);
  }
};

const alarmCookie = () => {
  const ca = document.cookie.split('; ');
  for (let sii = 0; sii < cookie.name.length; sii++) {
    for (let i = 0; i < ca.length; i++) {
      if (ca[i].indexOf(cookie.name[sii]) === 0) {
        const c = ca[i].substring(cookie.name[sii].length + 1, ca[i].length);
        const size = c.split('-');
        for (let j = 0; j < size.length; j++) {
          if (sii === 0) {
            alarmAdd();
            document.getElementById('name' + j).innerHTML = size[j];
          } else if (sii === 1) {
            const arr = size[j].split(':');
            setSelected(arr, j);
          } else if (sii === 2) {
            if (size[j] === 'true') {
              alarmSet('setButton' + j);
            }
          }
        }
      }
    }
  }
};

const checkCookie = () => {
  if (document.cookie === '') return '';
  alarmCookie();
};

export { addCookie, setCookie, checkCookie };
