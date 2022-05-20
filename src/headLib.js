const { splitLines, joinLines } = require('./stringUtils.js');

const firstNLines = (count, lines) => {
  return lines.slice(0, count);
};

const head = (content, count) => {
  const lines = splitLines(content);
  return joinLines(firstNLines(count, lines));
};

exports.firstNLines = firstNLines;
exports.head = head;
