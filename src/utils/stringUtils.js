const SEPARATOR = '\n';
const splitLines = (content) => content.split(SEPARATOR);
const joinLines = (content) => content.join(SEPARATOR);

exports.joinLines = joinLines;
exports.splitLines = splitLines;
