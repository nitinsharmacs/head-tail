const { tail } = require('./tailLib.js');
const { tailArgsParser } = require('./tailArgsParser.js');
const { validateOption } = require('./validators.js');

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
  let header = () => '';
  let exitCode = 0;
  let separator = '';
  if (filenames.length > 1) {
    header = createHeader;
  }
  filenames.forEach(filename => {
    try {
      const content = fileReader(filename, 'utf8');
      const withHeading = addHeader(header, filename, tail(content, options));
      const tailedFile = `${separator}${withHeading}`;
      console.logger(tailedFile);
      separator = '\n';
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
  assertFile(filenames);
  return tailFiles(fileReader, filenames, options, console);
};

exports.tailMain = tailMain;
exports.tailFiles = tailFiles;
