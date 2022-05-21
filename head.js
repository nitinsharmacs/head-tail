const fs = require('fs');
const { exit } = require('process');
const { headMain, usage } = require('./src/headLib');

const main = () => {
  try {
    console.log(headMain(fs.readFileSync, process.argv.slice(2)));
  } catch (error) {
    let message = 'head: ' + error.message;
    if (error.code === 'ILLEGOPTION') {
      message = message + '\n' + usage();
    }
    console.error(message);
    exit(1);
  }
};

main();
