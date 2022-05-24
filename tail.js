const fs = require('fs');
const { exit } = require('process');
const { tailMain } = require('./src/tail/tailMain.js');
const { createStderrMessage } = require('./src/tail/stderrHandler.js');

const main = () => {
  const { log: logger, error: errorLogger } = console;
  try {
    exit(
      tailMain(
        fs.readFileSync,
        process.argv.slice(2),
        { logger, errorLogger }
      )
    );
  } catch (error) {
    errorLogger(createStderrMessage(error));
    exit(1);
  }
};

main();

// console.log('usage: tail [-c # | -n #] [file ...]');
