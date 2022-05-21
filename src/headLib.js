const { splitLines, joinLines } = require('./stringUtils.js');
const { parseArgs, compileOption } = require('./parseArgs.js');

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

const headMain = (fileReader, args) => {
  const { filenames, options } = parseArgs(args);
  const [filename] = filenames;
  const content = fileReader(filename, 'utf8');
  return head(content, compileOption(options));
};

exports.firstNLines = firstNLines;
exports.nBytesFrom = nBytesFrom;
exports.head = head;
exports.headMain = headMain;
