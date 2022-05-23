const lastNLines = (lines, count) => {
  return count > lines.length ? lines : lines.slice(lines.length - count);
};

const lastNBytes = (content, count) => {
  return count > content.length ?
    content : content.slice(content.length - count);
};

exports.lastNLines = lastNLines;
exports.lastNBytes = lastNBytes;
