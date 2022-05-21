const fs = require('fs');
const { headMain } = require('./src/headLib');

const main = () => {
  try {
    return headMain(fs.readFileSync, process.argv.slice(2));
  } catch (error) {
    return 'head: ' + error.message;
  }
};

console.log(main());
// console.log('usage: head [-n lines | -c bytes] [file ...]');
