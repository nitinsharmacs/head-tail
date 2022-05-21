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

const compileOptions = (options) => {
  const defaultCount = 10;
  if (options['-c']) {
    return {
      askedForBytes: true,
      count: options['-c']
    };
  }
  return {
    askedForBytes: false,
    count: options['-n'] || defaultCount
  };
};

const headMain = (fileReader, args) => {
  const { filenames, options } = parseArgs(args);
  const [filename] = filenames;
  const content = fileReader(filename, 'utf8');
  return head(content, compileOptions(options));
};

exports.compileOptions = compileOptions;
exports.firstNLines = firstNLines;
exports.nBytesFrom = nBytesFrom;
exports.head = head;
exports.headMain = headMain;
