const fs = require('fs');
const { exit } = require('process');
const { tailMain } = require('./src/tail/tailMain.js');
const { stderrMessage } = require('./src/tail/errorHandler.js');

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
    errorLogger(stderrMessage(error));
    exit(1);
  }
};

main();
