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
}

const setCookie = (id, nameId, value, expires) => {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].indexOf(cookie.name[nameId]) === 0) {
      const coockieValue = cookies[i].substring(cookie.name[nameId].length + 1, cookies[i].length);
      const array = coockieValue.split('-');
      array[id] = value;
      let string = '';
      for (let j = 0; j < array.length; j++) string += '-' + array[j];
      document.cookie = cookie.name[nameId] + '=' + string.slice(1) + ';' + expires + ';path=/';
      break;
    }
  }
}

const addCookie = () => {
  const expires = expireDate();
  if (!document.cookie) {
    for (let i = 0; i < cookie.name.length; i++) {
      document.cookie = cookie.name[i] + '=' + cookie.defValue[i] + ';' + expires + ';path=/';
    }
  } else {
  for (let j = 0; j < cookie.name.length; j++) {
    setCookie(alarmSettings.index - 1, j, cookie.defValue[j], expires)
  }
}
};

const changeCookie = (id, nameId, value) => {
  const neededId = id.replace(/[a-zA-Z]+/, '');
  const expires = expireDate();
  setCookie(neededId, nameId, value, expires)
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

export { addCookie, changeCookie, checkCookie };
