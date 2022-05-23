const fs = require('fs');
const { exit } = require('process');
const { headMain } = require('./src/headLib');
const { createStdoutMessage } = require('./src/stdoutHandler.js');

const main = () => {
  try {
    const { log: logger, error: errorLogger } = console;
    exit(
      headMain(
        fs.readFileSync,
        process.argv.slice(2),
        { logger, errorLogger }
      )
    );
  } catch (error) {
    console.error(createStdoutMessage(error));
    exit(1);
  }
};
// comment
main();
