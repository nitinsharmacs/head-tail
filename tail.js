const fs = require('fs');
const { tailMain } = require('./src/tail/tailMain.js');
const { stderrMessage } = require('./src/tail/errorHandler.js');

const main = (args) => {
  const { log: logger, error: errorLogger } = console;
  try {
    process.exitCode = tailMain(
      fs.readFileSync,
      args,
      { logger, errorLogger }
    );
  } catch (error) {
    errorLogger(stderrMessage(error));
    process.exitCode = 1;
  }
};

main(process.argv.slice(2));
