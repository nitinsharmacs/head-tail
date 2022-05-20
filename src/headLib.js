const firstNLines = (count, lines) => {
  return lines.slice(0, count);
};

const head = (content, count) => {
  const lines = content.split('\n');
  return firstNLines(count, lines).join('\n');
};

exports.firstNLines = firstNLines;
exports.head = head;
