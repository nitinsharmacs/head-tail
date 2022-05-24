const { splitLines, joinLines } = require('../head/stringUtils.js');

const lastNLines = (lines, count) => {
  return count > lines.length ? lines : lines.slice(lines.length - count);
};

const linesStartingAt = (lines, count) => {
  const startAt = count === 0 ? count : count - 1;
  return lines.slice(startAt);
};

const lastNBytes = (content, count) => {
  return count > content.length ?
    content : content.slice(content.length - count);
};

const bytesStartingAt = (content, count) => {
  const startAt = count === 0 ? count : count - 1;
  return content.slice(startAt);
};

const linesFrom = (content, { count, relativeToBeginning }) => {
  const lines = splitLines(content);
  if (relativeToBeginning) {
    return joinLines(linesStartingAt(lines, count));
  }
  return joinLines(lastNLines(lines, count));
};

const bytesFrom = (content, { count, relativeToBeginning }) => {
  if (relativeToBeginning) {
    return bytesStartingAt(content, count);
  }
  return lastNBytes(content, count);
};

const tail = (content, options) => {
  if (options.askedForBytes) {
    return bytesFrom(content, options);
  }
  return linesFrom(content, options);
};

exports.lastNLines = lastNLines;
exports.linesStartingAt = linesStartingAt;
exports.lastNBytes = lastNBytes;
exports.bytesStartingAt = bytesStartingAt;
exports.linesFrom = linesFrom;
exports.bytesFrom = bytesFrom;
exports.tail = tail;
