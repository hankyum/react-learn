const dataQueue = {};
const intervalCache = {};

const processDataInQueue = (name, data) => {
  const dataSet = dataQueue[name] = dataQueue[name] || [];
  if (data) {
    const [func, ...args] = data;
    console.log('putData', ...args);
    dataSet.push(data);
  }
  setTimeout(() => {
    const dataSet = dataQueue[name] = dataQueue[name] || [];
    const data = dataSet.shift();
    if (data) {
      const [func, ...args] = data;
      //console.log('processing', ...args);
      func(...args);
      processDataInQueue(name);
    }
  }, 100);
  // const interval = intervalCache[name] = intervalCache[name] ||
  //     setInterval(() => {
  //       const dataSet = dataQueue[name] = dataQueue[name] || [];
  //       const data = dataSet.shift();
  //       if (data) {
  //         const [func, ...args] = data;
  //         console.log('processing', ...args);
  //         func(...args);
  //       } else {
  //         console.log('clearInterval', name, interval);
  //         clearInterval(interval);
  //         intervalCache[name] = null;
  //         console.log(intervalCache);
  //       }
  //     }, 100);
};


const loop = 1;

setTimeout(() => {
  for (let i = 0; i < loop; i++) {
    processDataInQueue('test', [
      (...args) => {
        console.log(...args);
      }, i, 'test-1']);
  }
}, 0);

for (let i = 0; i < loop; i++) {
  processDataInQueue('test', [
    (...args) => {
      console.log(...args);
    }, i, 'test-2']);
}

setTimeout(() => {
  for (let i = 0; i < loop; i++) {
    processDataInQueue('test', [
      (...args) => {
        console.log(...args);
      }, i, 'test-3']);
  }
}, 10000);

for (let i = 0; i < loop; i++) {
  processDataInQueue('test3', [
    (...args) => {
      console.log(...args);
    }, i, 'test-4']);
}

setTimeout(() => {
  for (let i = 0; i < loop; i++) {
    processDataInQueue('test3', [
      (...args) => {
        console.log(...args);
      }, i, 'test-5']);
  }
}, 10000);

setTimeout(() => {
  for (let i = 0; i < loop; i++) {
    processDataInQueue('test1', [
      (...args) => {
        console.log(...args);
      }, i, 'test-6']);
  }
}, 10000);

for (let i = 0; i < loop; i++) {
  processDataInQueue('test1', [
    (...args) => {
      console.log(...args);
    }, i, 'test-7']);
}

setTimeout(() => {
  for (let i = 0; i < loop; i++) {
    processDataInQueue('test1', [
      (...args) => {
        console.log(...args);
      }, i, 'test-8']);
  }
}, 10000);