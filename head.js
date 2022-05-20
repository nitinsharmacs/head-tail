const fs = require('fs');
const { headMain } = require('./src/headLib');

const main = () => {
  return headMain(fs.readFileSync, process.argv.slice(2));
};

console.log(main());
// console.log('usage: head [-n lines | -c bytes] [file ...]');
