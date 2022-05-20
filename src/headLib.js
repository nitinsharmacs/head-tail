const { splitLines, joinLines } = require('./stringUtils.js');

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

const headMain = (fileReader, fileName) => {
  const content = fileReader(fileName, 'utf8');
  return head(content, { askedForBytes: false, count: 10 });
};

exports.firstNLines = firstNLines;
exports.nBytesFrom = nBytesFrom;
exports.head = head;
exports.headMain = headMain;
