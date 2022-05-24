const fs = require('fs');
const { exit } = require('process');
const { tailMain } = require('./src/tail/tailMain.js');

const main = () => {
  try {
    const { log: logger, error: errorLogger } = console;
    exit(
      tailMain(
        fs.readFileSync,
        process.argv.slice(2),
        { logger, errorLogger }
      )
    );
  } catch (error) {
    console.error('tail:', error.message);
    exit(1);
  }
};

main();

// console.log('usage: tail [-c # | -n #] [file ...]');
