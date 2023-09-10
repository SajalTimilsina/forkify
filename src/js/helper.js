// function we use over an over again
import { TIME_OUT } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    console.log(url);
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIME_OUT)]);
    //const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
    console.log(res, data);
  } catch (err) {
    throw err;
  }
};
