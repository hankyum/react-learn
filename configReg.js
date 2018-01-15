const typeMap = {
  cf: 'config',
  cl: 'color',
};
const parse = (str) => {
  const [, value, type, key] = /[:=]\s*"?([^",]+)"?\s*,?\s*\/\/(c[fl])[.-]([^;-]+);\s*/gi.exec(
      str) || [];
  return {key, type: typeMap[type], value};
};

[
  ': "#222222" , //cl.red ;',
  ': 3, //cf.test.number ;',
].forEach((e) => {
  const {value, key, type} = parse(e);
  if (key && value) {
    console.log(type, key, value);
  }
});