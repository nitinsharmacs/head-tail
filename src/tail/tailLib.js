const { splitLines, joinLines } = require('../head/stringUtils.js');

const lastNLines = (lines, count) => {
  return count > lines.length ? lines : lines.slice(lines.length - count);
};

const linesStartingAt = (lines, count) => {
  const startAt = count - 1;
  return count === 0 ? lines : lines.slice(startAt);
};

const lastNBytes = (content, count) => {
  return count > content.length ?
    content : content.slice(content.length - count);
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
exports.tail = tail;
