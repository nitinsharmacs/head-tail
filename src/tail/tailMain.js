const { tail } = require('./tailLib.js');
const { tailArgsParser } = require('./tailArgsParser.js');
const { validateOption } = require('./validators.js');
const { usage } = require('./stderrHandler.js');

const createHeader = (filename) => {
  return `==> ${filename} <==\n`;
};

const noFileMessage = (filename) => {
  return filename + ': ' + 'No such file or directory';
};

const addHeader = (header, heading, text) => {
  return `${header(heading)}${text}`;
};

const tailFiles = (fileReader, filenames, options, console) => {
  let header = createHeader;
  let exitCode = 0;
  if (filenames.length <= 1 || options.supressHeadings) {
    header = () => '';
  }
  filenames.forEach(filename => {
    try {
      const content = fileReader(filename, 'utf8');
      const tailedFile = addHeader(header, filename, tail(content, options));
      console.logger(tailedFile);
    } catch (error) {
      exitCode = 1;
      console.errorLogger('tail: ' + noFileMessage(filename));
    }
  });
  return exitCode;
};

const assertFile = (files) => {
  if (files.length === 0) {
    throw {
      code: 'NO_FILE_PROVIDED',
      message: '',
      showUsage: true
    };
  }
};

const tailMain = (fileReader, args, console) => {
  const { filenames, options } = tailArgsParser(args, validateOption);
  const exitCode = 0;
  const [firstArg] = args;
  if (firstArg === '--help') {
    console.logger(usage());
    return exitCode;
  }
  assertFile(filenames);
  return tailFiles(fileReader, filenames, options, console);
};

exports.tailMain = tailMain;
exports.tailFiles = tailFiles;
