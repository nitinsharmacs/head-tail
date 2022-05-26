const fs = require('fs');
const { exit } = require('process');
const { headMain } = require('./src/head/headLib.js');
const { stderrMessage } = require('./src/head/errorHandler.js');

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
    console.error(stderrMessage(error));
    exit(1);
  }
};

main();
