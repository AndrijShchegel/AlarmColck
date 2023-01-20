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

export {setCookie}