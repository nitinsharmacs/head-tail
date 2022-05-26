const fs = require('fs');
const { tailMain } = require('./src/tail/tailMain.js');
const { stderrMessage } = require('./src/tail/errorHandler.js');

const main = () => {
  const { log: logger, error: errorLogger } = console;
  try {
    process.exitCode = tailMain(
      fs.readFileSync,
      process.argv.slice(2),
      { logger, errorLogger }
    );
  } catch (error) {
    errorLogger(stderrMessage(error));
    process.exitCode = 1;
  }
};

main();
