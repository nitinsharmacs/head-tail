const fs = require('fs');
const { exit } = require('process');
const { validateOption } = require('./src/head/validators.js');
const { headMain } = require('./src/head/headLib.js');
const { createStdoutMessage } = require('./src/head/stdoutHandler.js');

const main = () => {
  try {
    const { log: logger, error: errorLogger } = console;
    exit(
      headMain(
        fs.readFileSync,
        process.argv.slice(2),
        { logger, errorLogger },
        validateOption
      )
    );
  } catch (error) {
    console.error(createStdoutMessage(error));
    exit(1);
  }
};

main();
