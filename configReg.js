const typeMap = {
  cf: 'config',
  cl: 'color',
};
const configRegExp = /[:=]\s*"?([^",]+)"?\s*,?\s*\/\/(c[fl])[._]([^.][^,"]+[^.]+);\s*/gi;
const parse = (str) => {
  const [, value, type, key] = new RegExp(configRegExp).exec(
      str) || [];
  return {key: key && key.trim(), type: typeMap[type], value: value && value.trim()};
};

const res = {
  color: {},
  config: {}
};

[
  'sss: "#222222" , //cl.page.red ;ssss',
  ': 3, //cf.test.number;',
  ': 4, //cf.test.number;',
].forEach((e) => {
  const {value, key, type} = parse(e);
  if (key && value) {
    console.log(type, key, value);
    if (res[type][key] != value) {
      res[type][key] =  value * 1 ? value * 1 : value;
    }
  }
});

require("fs").writeFileSync("configRes.json", JSON.stringify(res, null, 4));