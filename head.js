const fs = require('fs');
const { headMain } = require('./src/headLib');

const usage = () => {
  return 'usage: head [-n lines | -c bytes] [file ...]';
};

const main = () => {
  try {
    return headMain(fs.readFileSync, process.argv.slice(2));
  } catch (error) {
    let message = 'head: ' + error.message;
    if (error.code === 'ILLEGALOPTION') {
      message = message + '\n' + usage();
    }
    return message;
  }
};

console.log(main());
// console.log('usage: head [-n lines | -c bytes] [file ...]');
