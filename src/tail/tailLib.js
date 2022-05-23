const lastNLines = (lines, count) => {
  return count > lines.length ? lines : lines.slice(lines.length - count);
};

exports.lastNLines = lastNLines;
