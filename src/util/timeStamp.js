const timeStamp = (param) =>  {
    const date = new Date(param);
    let hour = date.getHours();
    let min = date.getMinutes();
    let apm = hour >= 12 ? '오후' : '오후';
    hour = hour >= 13 ? hour-12 : hour;
    hour = String(hour).length===2 ? String(hour) : `0${hour}`
    min = String(min).length===2 ? String(min) : `0${min}`
    return `${apm} ${hour}:${min}`
  }

export default timeStamp