const fs = require('fs');
const { exit } = require('process');
const { headMain } = require('./src/headLib');
const { createStdoutMessage } = require('./src/studoutHandler.js');

const main = () => {
  try {
    console.log(headMain(fs.readFileSync, process.argv.slice(2)));
  } catch (error) {
    console.error(createStdoutMessage(error));
    exit(1);
  }
};

main();
