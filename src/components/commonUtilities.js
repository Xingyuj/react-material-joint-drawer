const times = x => (f) => {
  if (x > 0) {
    f();
    times(x - 1)(f);
  }
};

const get = (obj, key) => key.split('.').reduce((o, x) => (typeof o === 'undefined' || o === null) ? o : o[x], obj);

const has = (obj, key) => key.split('.').every((x) => {
  if (typeof obj !== 'object' || obj === null || !(x in obj)) { return false; }
  obj = obj[x];
  return true;
});

const logger = (log, param) => {
  const debug = true;
  if (debug) {
    return arguments.length >= 2 ? console.log(log, param) : console.log(log);
  }
  return () => {};
};

const undefNullNaNChecker = param => param !== undefined && param !== null && !isNaN(param);

export {times, get, has, logger, undefNullNaNChecker};
