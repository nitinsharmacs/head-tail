const { splitLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');
const { usage } = require('./studoutHandler.js');

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

const noFileMessage = (filename) => {
  return filename + ': ' + 'No such file or directory';
};

const headFile = (fileReader, filename, options, header) => {
  try {
    const content = fileReader(filename, 'utf8');
    return `${header(filename)}${head(content, options)}`;
  } catch (error) {
    return 'head: ' + noFileMessage(filename);
  }
};

const assertFile = (files) => {
  if (files.length === 0) {
    throw {
      code: 'NO_FILE_PROVIDED',
      message: usage()
    };
  }
};

const headMain = (fileReader, args) => {
  const [firstArg] = args;
  if (firstArg === '--help') {
    return usage();
  }
  const { filenames, options } = parseArgs(args);
  assertFile(filenames);
  if (filenames.length === 1) {
    const [filename] = filenames;
    return headFile(fileReader, filename, options, () => '');
  }
  const contents = filenames.map(filename => headFile(fileReader,
    filename,
    options, createHeader));
  return joinLines(contents);
};

exports.firstNLines = firstNLines;
exports.nBytesFrom = nBytesFrom;
exports.head = head;
exports.headMain = headMain;
exports.assertFile = assertFile;
exports.usage = usage;
exports.createHeader = createHeader;
exports.noFileMessage = noFileMessage;
