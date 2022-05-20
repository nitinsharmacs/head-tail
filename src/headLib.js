const { splitLines, joinLines } = require('./stringUtils.js');

const firstNLines = (count, lines) => {
  return lines.slice(0, count);
};

const nBytesFrom = (content, bytes) => {
  return content.slice(0, bytes);
};

const head = (content, count) => {
  const lines = splitLines(content);
  return joinLines(firstNLines(count, lines));
};

exports.head = head;
exports.firstNLines = firstNLines;
exports.nBytesFrom = nBytesFrom;
