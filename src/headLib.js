const { splitLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');

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
  return `\n==> ${filename} <==\n`;
};

const noFileMessage = (filename) => {
  return filename + ': ' + 'No such file or directory';
};

const headFile = (fileReader, filename, options, showHeader) => {
  try {
    const content = fileReader(filename, 'utf8');
    const header = showHeader ? createHeader(filename) : '';
    return `${header}${head(content, options)}`;
  } catch (error) {
    return 'head: ' + noFileMessage(filename);
  }
};

// TODO : multiple files here
const headMain = (fileReader, args) => {
  const { filenames, options } = parseArgs(args);
  if (filenames.length === 1) {
    return headFile(fileReader, filenames[0], options, false);
  }
  const contents = filenames.map(filename => headFile(fileReader,
    filename,
    options, true));
  return joinLines(contents);
};

exports.firstNLines = firstNLines;
exports.nBytesFrom = nBytesFrom;
exports.head = head;
exports.headMain = headMain;
