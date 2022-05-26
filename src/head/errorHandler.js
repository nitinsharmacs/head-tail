const {
  createStderrMessage,
  fileErrorMessage } = require('../utils/stderrHandler.js');

const usage = () => {
  return 'usage: head [-n lines | -c bytes] [file ...]';
};

const prefix = (text) => {
  return `head: ${text}`;
};

const stderrMessage = (error) => {
  return createStderrMessage(error, prefix, usage);
};

const createFileErrorMessage = (error) => {
  return fileErrorMessage(error, prefix);
};

exports.usage = usage;
exports.prefix = prefix;
exports.stderrMessage = stderrMessage;
exports.createFileErrorMessage = createFileErrorMessage;
