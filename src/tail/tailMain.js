const { tail } = require('./tailLib.js');
const { parseArgs } = require('../head/parseArgs.js');

const tailMain = (fileReader, args, console, validator) => {
  const { filenames, options } = parseArgs(args, validator);
  let exitCode = 0;
  try {
    const content = fileReader(filenames[0], 'utf8');
    console.logger(tail(content, options));
  } catch (error) {
    exitCode = 1;
    console.errorLogger('error');
  }
  return exitCode;
};

exports.tailMain = tailMain;