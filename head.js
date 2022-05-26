const fs = require('fs');
const { headMain } = require('./src/head/headLib.js');
const { stderrMessage } = require('./src/head/errorHandler.js');

const main = (args) => {
  try {
    const { log: logger, error: errorLogger } = console;
    process.exitCode = headMain(
      fs.readFileSync,
      args,
      { logger, errorLogger }
    );
  } catch (error) {
    console.error(stderrMessage(error));
    process.exitCode = 1;
  }
};

main(process.argv.slice(2));
