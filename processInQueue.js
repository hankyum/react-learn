const dataQueue = {};
const intervalCache = {};
const processDataInQueue = (name, data) => {
  const [func, ...args] = data;
  console.log('putData', ...args);
  const dataSet = dataQueue[name] = dataQueue[name] || [];
  dataSet.push(data);
  const interval = intervalCache[name] = intervalCache[name] ||
      setInterval(() => {
        const dataSet = dataQueue[name] = dataQueue[name] || [];
        const data = dataSet.shift();
        if (data) {
          const [func, ...args] = data;
          console.log('processing', ...args);
          func(...args);
        } else {
          console.log('clearInterval', name, interval);
          clearInterval(interval);
          intervalCache[name] = null;
          console.log(intervalCache);
        }
      }, 100);
};

setTimeout(() => {
  for (let i = 0; i < 10; i++) {
    processDataInQueue('test', [
      (...args) => {
        console.log(...args);
      }, i, 'test-1']);
  }
}, 0);

for (let i = 0; i < 10; i++) {
  processDataInQueue('test', [
    (...args) => {
      console.log(...args);
    }, i, 'test-2']);
}

setTimeout(() => {
  for (let i = 0; i < 10; i++) {
    processDataInQueue('test', [
      (...args) => {
        console.log(...args);
      }, i, 'test-3']);
  }
}, 10000);

for (let i = 0; i < 10; i++) {
  processDataInQueue('test3', [
    (...args) => {
      console.log(...args);
    }, i, 'test-2']);
}

setTimeout(() => {
  for (let i = 0; i < 10; i++) {
    processDataInQueue('test3', [
      (...args) => {
        console.log(...args);
      }, i, 'test-3']);
  }
}, 10000);

setTimeout(() => {
  for (let i = 0; i < 10; i++) {
    processDataInQueue('test1', [
      (...args) => {
        console.log(...args);
      }, i, 'test-4']);
  }
}, 10000);

for (let i = 0; i < 10; i++) {
  processDataInQueue('test1', [
    (...args) => {
      console.log(...args);
    }, i, 'test-5']);
}