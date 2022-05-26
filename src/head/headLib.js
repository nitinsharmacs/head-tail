const { splitLines, joinLines } = require('./stringUtils.js');
const { headArgsParser } = require('./headArgsParser.js');
const { usage, fileErrorMessage } = require('./stderrHandler.js');
const { validateOption } = require('./validators.js');

const firstNLines = (lines, count) => {
  return lines.slice(0, count);
};

const nBytesFrom = (content, bytes) => {
  return content.slice(0, bytes);
};

const head = (content, { askedForBytes, count }) => {
  if (askedForBytes) {
    return nBytesFrom(content, count);
  }
  const lines = splitLines(content);
  return joinLines(firstNLines(lines, count));
};

const createHeader = (filename) => {
  return `==> ${filename} <==\n`;
};

const addHeader = (header, heading, text) => {
  return `${header(heading)}${text}`;
};

const headFiles = (fileReader, filenames, options, console) => {
  let header = () => '';
  let exitCode = 0;
  let separator = '';
  if (filenames.length > 1) {
    header = createHeader;
  }
  filenames.forEach(filename => {
    try {
      const content = fileReader(filename, 'utf8');
      const withHeading = addHeader(header, filename, head(content, options));
      const headedFile = `${separator}${withHeading}`;
      console.logger(headedFile);
      separator = '\n';
    } catch (error) {
      exitCode = 1;
      console.errorLogger(fileErrorMessage(error));
    }
  });
  return exitCode;
};

const assertFile = (files) => {
  if (files.length === 0) {
    throw {
      code: 'NO_FILE_PROVIDED',
      message: usage()
    };
  }
};

const headMain = (fileReader, args, console) => {
  const exitCode = 0;
  const [firstArg] = args;
  if (firstArg === '--help') {
    console.logger(usage());
    return exitCode;
  }
  const { filenames, options } = headArgsParser(args, validateOption);
  assertFile(filenames);
  return headFiles(fileReader, filenames, options, console);
};

exports.firstNLines = firstNLines;
exports.nBytesFrom = nBytesFrom;
exports.head = head;
exports.headMain = headMain;
exports.headFiles = headFiles;
exports.assertFile = assertFile;
exports.usage = usage;
exports.createHeader = createHeader;
