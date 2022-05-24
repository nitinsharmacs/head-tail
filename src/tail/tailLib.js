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

const tail = (content, { askedForBytes, count }) => {
  if (askedForBytes) {
    return lastNBytes(content, count);
  }
  const lines = splitLines(content);
  return joinLines(lastNBytes(lines, count));
};

// {
//   askedForBytes,
//   relativeToBeginning,
//   count
// }
exports.lastNLines = lastNLines;
exports.linesStartingAt = linesStartingAt;
exports.lastNBytes = lastNBytes;
exports.bytesStartingAt = bytesStartingAt;
exports.linesFrom = linesFrom;
exports.tail = tail;
