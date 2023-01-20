import { alarmSettings } from './config.js';
import { alarmAdd } from './alarmStart.js';
import { alarmSet } from './alarmButtons.js';

const cookie = {
  name: ['name', 'time', 'isSet'],
  defValue: ['Alarm', '00:00:00', 'false']
};

const setCookie = (id, nameId, value) => {
  const neededId = id.replace(/[a-zA-Z]+/, '');
  const ca = document.cookie.split('; ');
  const d = new Date();
  d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
  const expires = 'expires=' + d.toUTCString();
  for (let i = 0; i < ca.length; i++) {
    if (ca[i].indexOf(cookie.name[nameId]) === 0) {
    const c = ca[i].substring(cookie.name[nameId].length + 1, ca[i].length);
    const arr = c.split('-');
    arr[neededId] = value;
    let str = '';
    for (let j = 0; j < arr.length; j++) { str += '-' + arr[j]; }
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
        }
        if (sii === 1) {
            const arr = size[j].split(':');
            setSelected(arr, j);
        }
        if (sii === 2) {
            if (size[j] === 'true') {
            alarmSet('setButton' + j);
            }
        }
        }
    }
    }
    break;
  }
};

const checkCookie = () => {
  if (document.cookie === '') { return ''; }
  alarmCookie();
};

export {setCookie, checkCookie}